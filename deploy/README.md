# My Alert: push-deploy (Ansible)

A thin Ansible push-deploy slice. It SSHes into two VPS hosts (frontend and
backend) and triggers `make docker-build-prod` on each.

> Note: the actual build/compose/nginx step (`make docker-build-prod`) lives in
> the application repos on each server. This slice only *triggers* the build;
> it does not contain the Docker, Compose, or nginx configuration itself.

## 1. Install Ansible on your workstation

macOS:

1) Via Homebrew:
```bash
brew install ansible
ansible --version
```

2) Via pip (if Homebrew gives you trouble):
https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html

## 2. Set up the SSH connection to the servers

Create an SSH key if you don't have one yet:

```bash
# Generate the SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"
# Accept the defaults by pressing Enter at each prompt.

# Start the ssh-agent that manages your keys
eval "$(ssh-agent -s)"

# Add the new key to the agent
ssh-add ~/.ssh/id_ed25519
```

Copy the public key to the server:

```bash
ssh-copy-id deploy@frontend.example.com
# Use a dedicated unprivileged "deploy" user with sudo rights (not root).
```

Run a ping to verify connectivity:

```bash
make ping
```

## 3. Usage

Deploy an application, for example the My Alert frontend:

```bash
make deploy-my-alert-frontend
```

> See the Makefile for the remaining commands.

## Configuration

Edit `inventory.ini` and replace the placeholder hosts
(`frontend.example.com` / `backend.example.com`) with your real ones.
