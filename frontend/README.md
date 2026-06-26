# MyAlert: Frontend

Single-page web app for **MyAlert**, a service that watches your marketplace
accounts (Avito and more) and sends you real-time notifications and automatic
replies, no CRM and no complex software required.

The app has two parts:

- **Public landing:** marketing pages describing the product, its
  notification/auto-reply strategies, pricing and support.
- **Gated dashboard:** appears after you sign in with Telegram. From here you
  connect marketplace accounts, build connectors, and manage your subscription.

## Stack

- **React 18** + **Vite**
- **Chakra UI** (+ Emotion, Framer Motion) for the component system
- **Redux Toolkit** + **redux-persist** for state
- **React Router** for routing
- **Formik** + **Yup** for forms and validation
- **@telegram-auth/react** for Telegram login
- **Axios** for the API client

## Key flows

### Telegram login
The landing is public. Protected routes require authentication, performed
through the Telegram login widget (`VITE_BOT_NAME`). On success the backend sets
an auth cookie and the user lands in the dashboard.

### Connecting an Avito account
Accounts are connected from the dashboard. For Avito the app starts an OAuth
flow against `avito.ru` using `VITE_AVITO_CLIENT_ID`; an API-key integration is
also supported. A Telegram account can be connected by link or by code so the
bot can deliver notifications.

### Connector builder (4 steps)
A connector wires a **data source** to one or more **outputs** through a
**strategy**:

1. **Source:** choose the service that produces events (e.g. Avito).
2. **Strategy:** pick what to do: notify on a missed message, notify on a
   negative message, auto-reply to a missed message, greeting auto-reply, etc.
3. **Strategy settings:** configure the rule (business hours, missed-message
   timeout, message texts, ...).
4. **Outputs:** select which accounts receive the notifications.

### Subscription (Tinkoff)
The dashboard exposes a paid subscription with auto-payment (recurring billing),
renewal management, and the related consent screens.

## Adding a new service or strategy

Services and their strategies are described declaratively in
`src/data/services.jsx`. To add a new service:

1. Add a service object to `services.jsx` (key, connection component, badge,
   icon, titles, and at least one strategy; the strategies object must not be
   empty).
2. Create a strategy settings component under `src/components/strategies/`.
   Use `StrategySample.jsx` as a template and wire its fields to the rules you
   declared in `services.jsx`.
3. Import the settings component in `services.jsx` and reference it from the
   strategy's `createSettingsComponent`.

## Local development

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # Vite dev server
npm run build          # production build
npm run lint           # ESLint
```

### Environment variables

See [`.env.example`](./.env.example). The main ones:

- `VITE_API_URL`: base URL of the MyAlert backend API
- `VITE_BOT_NAME`: Telegram bot username for the login widget
- `VITE_AVITO_CLIENT_ID`: OAuth client id of your Avito application

> Note: this is a public showcase. Secrets are not committed; use `.env`
> (gitignored) locally, and the legal pages under `src/pages/docs/` are generic
> placeholders.
