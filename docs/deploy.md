# Deployment

MyAlert is shipped with a **push-based Ansible** model: the operator runs a playbook from their workstation, which connects to the target host(s) over SSH and brings up the Docker stack. The deploy slice in this repo is **sanitized**: real hosts, users, and credentials are replaced with placeholders.

## Push model

```text
operator workstation  ──ssh──>  target host
   ansible-playbook                 docker compose up (built image)
```

There is no central CD server; the operator initiates the deploy. Two playbooks split the stack:

| Playbook | Brings up |
|---|---|
| `deploy-backend-alert.yml` | The backend microservice mesh (Nginx gateway + services + MongoDB) |
| `deploy-frontend-alert.yml` | The React dashboard |

Hosts are listed in an inventory file. A sanitized template ships as `inventory.example.ini`:

```ini
[backend]
backend-host-1 ansible_host=<YOUR_HOST_IP> ansible_user=<DEPLOY_USER>

[frontend]
frontend-host-1 ansible_host=<YOUR_HOST_IP> ansible_user=<DEPLOY_USER>
```

> The original deploy used **root SSH** and built images **on the production host**. Both are called out as evolution targets in [`trade-offs.md`](trade-offs.md) (least-privilege deploy user; CI-built images pulled from a registry).

## Where `make docker-build-prod` lives

The image **build** targets (e.g. `make docker-build-prod`) live in the **application repos** (`backend/`, `frontend/`), not in this deploy slice. The Ansible layer's job is to **orchestrate** the deploy on the host; building the images is the app's own concern. Keeping the two separate means the deploy playbooks stay focused on host orchestration and don't duplicate build logic.

## Running a deploy

```bash
cd deploy
cp inventory.example.ini inventory.ini   # fill in your hosts + a least-privilege deploy user
ansible-playbook -i inventory.ini deploy-backend-alert.yml
ansible-playbook -i inventory.ini deploy-frontend-alert.yml
```

## Secrets

No real credentials are committed. Every secret (Mongo creds, Avito OAuth, the Telegram bot token, Tinkoff keys, host IPs, SSH users, TLS cert filenames, the production domain) is a placeholder in an `.env.example` / `inventory.example.ini`. Bring your own.
