install:
	git pull
	npm ci

ssh-key:
	ssh-keygen -t ed25519
	eval "$$(ssh-agent -s)"
	ssh-add ~/.ssh/id_ed25519
	cat ~/.ssh/id_ed25519.pub

lint:
	npx eslint .

fix:
	npx eslint --fix .

run-server:
	npm start

run-dev-server:
	npm run dev

# Run on localhost
docker-build-dev:
	docker compose -f docker-compose.dev.yml build
	docker compose -f docker-compose.dev.yml up
	yes | docker system prune

# Run on production server
docker-build-prod:
	git pull
	docker compose build
	docker compose up
	yes | docker system prune

docker-clear:
	docker rm -f $$(docker ps -qa)
	docker rmi -f $$(docker images -aq)
	docker system prune