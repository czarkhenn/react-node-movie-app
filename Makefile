build:
	docker-compose -f docker-compose.yml build --no-cache
start:
	docker-compose -f docker-compose.yml up -d
stop:
	docker-compose -f docker-compose.yml down --remove-orphans
logs-front:
	docker-compose -f docker-compose.yml logs -f frontend
logs-back:
	docker-compose -f docker-compose.yml logs -f backend
restart:
	make stop && make start