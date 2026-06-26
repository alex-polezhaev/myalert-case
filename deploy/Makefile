ping:
	ansible all -i inventory.ini -m ping

deploy-my-alert-frontend:
	ansible-playbook playbooks/deploy-frontend-alert.yml -i inventory.ini

deploy-my-alert-backend:
	ansible-playbook playbooks/deploy-backend-alert.yml -i inventory.ini