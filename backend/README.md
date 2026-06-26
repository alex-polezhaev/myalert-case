# My Alert: Backend

Notification SaaS for online sellers. My Alert watches a seller's incoming
channels (Avito messenger), detects situations worth acting on (a **missed
message**, a **first message**, or a **negative-sentiment message**) and then
either **notifies** the seller (Telegram) or **auto-replies** on their behalf
(Avito). It is built as a small mesh of single-responsibility Node/Express
microservices plus one Python sentiment service, orchestrated with Docker
Compose behind an Nginx gateway.

> This is a public showcase build of a private project. Secrets and owner PII
> have been removed; only the **Avito → Telegram / Avito auto-reply** path is
> actually wired end-to-end. Hooks for other channels (Google, Yandex, email,
> XML) exist in the code but are not implemented here.

## Service mesh

Eleven containers (see `docker-compose.yml`):

| Service | Tech | Responsibility |
| --- | --- | --- |
| **nginx** | Nginx | Public gateway. TLS termination, routing, and `auth_request` gateway auth (see below). |
| **auth** | Node/Express + Passport | Telegram-based login, session issuance, and the `/auth/check` endpoint used by the gateway. |
| **avito** | Node/Express | Avito integration: receives messenger webhooks, stores chats, runs sentiment tagging, evaluates rules, sends auto-replies. |
| **telegram** | Node/Express + node-telegram-bot-api | Sends Telegram messages / notifications; creates Telegram output accounts. |
| **message-mood** | Python (dostoevsky / FastText) | Sentiment classification of message text (positive / negative). |
| **conductor** | Node/Express | Periodic orchestrator: for every paying user, fans their inputs out to the rule servers. |
| **security-mongo** | Node/Express | Validation + authorization layer in front of data mutations (input/output combos, rule validation, hashing). |
| **task-manager** | Node/Express | Drains the Mongo task queue and delivers each task to its output service. |
| **payment** | Node/Express | Tinkoff (T-Kassa) payment init, recurring charges, and notification handling. |
| **mongo-server** | Node/Express + Mongoose | Data-access service: the only thing that talks to MongoDB. All other services call it over HTTP. |
| **mongo-db** | MongoDB 4.4 | The database itself, seeded by `mongo-init.js`. |
| (**dozzle**) | Dozzle | Container log viewer (ops convenience). |

## End-to-end flow: source → detect → queue → deliver

```
Avito webhook
   │  (new message for a seller's chat)
   ▼
[avito]  store/update chat in Mongo  ──►  [message-mood]  tag sentiment
   │
   ▼
[conductor]  every tick: for each paying user, push their inputs
   │          to the rule servers (notify_* / reply_* strategies)
   ▼
[avito] rule evaluation (business hours, missed-message timeout,
   │     first message, negative mood)  ──►  creates a TASK in Mongo
   ▼
Mongo "tasks" queue   (from_service + message + service_data)
   │
   ▼
[task-manager]  drains the queue, dispatches each task:
   ├─►  output_service = telegram  →  [telegram] send notification
   └─►  output_service = avito     →  [avito]   send auto-reply
   │                                  then mark task is_closed = true
```

**Detection rules** live in `rules.json` (the per-user shape):

- `notify_lost_message`: a client message left unanswered past `notify_timeout`
  minutes during business hours → notify the seller on Telegram.
- `notify_negative_mood`: last message classified `negative` → notify.
- `reply_first_message`: first message in a chat → auto-reply with a greeting.
- `reply_lost_message`: overdue message → auto-reply.

Each rule honors `use_business_hours` / `business_hours` and either creates a
**notification** task (delivered to Telegram) or an **auto-reply** task
(delivered back to Avito).

### Robot-reply marker (invisible character)

Every automated Avito reply is prefixed with the invisible Hangul Filler
character **U+3164** (`'ㅤ'`, the `ㅤ` literal in
`Avito/server/controllers/replyController.js`). When evaluating the
missed-message rule, incoming history is scanned for this marker
(`Avito/server/src/helpers/checkExistLostMessage.js`) so the system can tell its
own auto-replies apart from genuine human answers and avoid treating a bot reply
as "the seller already responded."

## Gateway auth (`auth_request`)

Nginx is the single entry point (`Nginx/templates/default.conf.template`).
A handful of routes are public (Telegram login, the Avito webhook, the Avito
OAuth code catcher, payment notifications). Everything else is protected by
Nginx's `auth_request` directive: each protected request is first sub-requested
to `auth /auth/check`. If the session is valid, `auth` returns `200` plus a
`user_id` header, which Nginx forwards upstream via `proxy_set_header user_id`;
otherwise the request is rejected. This keeps every business service free of
auth logic. They simply trust the `user_id` header injected by the gateway.

## Data: four Mongo databases

Seeded/connected per logical domain (`Mongo/server/mongoConnection.js`,
`mongo-init.js`):

- **base:** `users`, `accounts` (input/output channels), `inputs`, `outputs`.
- **avito:** `messenger.webhooks` and stored chats with message history + marks.
- **tasks:** the `common` task queue consumed by task-manager.
- **payment:** `orders` for Tinkoff recurring billing.

`mongo-init.js` creates the application DB user from `MONGO_USER` / `MONGO_PASS`
(read via `_getEnv`) and inserts a neutral demo user + demo accounts.

## Environment setup

1. Copy the env template and fill in real values:
   ```bash
   cp .env.example .env
   ```
   `.env` is gitignored and shared by every container via
   `env_file: .env`. It covers all service `*_PORT` / `*_HOST` values, the
   `MONGO_*` credentials and connection strings, `TG_BOT_TOKEN`,
   `SESSION_SECRET`, `TINKOFF_*`, and `AVITO_CLIENT_ID/SECRET`.

2. The **message-mood** service needs the FastText sentiment model
   (dostoevsky `fasttext-social-network-model`). It is large and **gitignored**;
   download it inside the MessageMood container at build time; it is not stored
   in this repo.

3. Run the mesh:
   ```bash
   make docker-build-dev    # local: docker-compose.dev.yml (HTTP only)
   make docker-build-prod   # production: docker-compose.yml (Nginx TLS)
   ```

## What is and isn't wired

- **Wired end-to-end:** Avito messenger ingestion → sentiment → rule evaluation
  → Mongo task queue → Telegram notification / Avito auto-reply, plus Telegram
  login and Tinkoff payment scaffolding.
- **Stubbed / not wired:** other input/output channels referenced in the API
  layer (`GOOGLE_HOST`, `YANDEX_HOST`, `XML_HOST`, `EMAIL_HOST`) are placeholders
  with no implementation in this showcase. The cross-account aggregation endpoint
  in `Avito/.../messageController.js` is intentionally a stub because it required
  live Avito credentials.
