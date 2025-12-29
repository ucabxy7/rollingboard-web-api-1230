SHELL := /bin/bash
.DEFAULT_GOAL := help

include .env

############################
# HELPER TARGETS
############################

.PHONY: help
help:  ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) |  awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

############################
# GENERAL
############################
.PHONY: build
build:  ## Build Docker images for development from scratch
	docker compose build --no-cache

.PHONY: start
start:  ## Build & start Docker containers for development
	docker compose up --build

.PHONY: fix-code
fix-code:  ## Lint & format code
	docker exec -it ${APP_NAME}-api sh -c "npm run fix-code"

.PHONY: type-check
type-check:  ## Check types
	docker exec -it ${APP_NAME}-api sh -c "npm run type-check"

.PHONY: prisma-migrate
prisma-migrate: ### Run development migrations generation & application
	docker exec -it ${APP_NAME}-api sh -c "npx prisma migrate dev" && npx prisma generate

.PHONY: prisma-migrate-dry
prisma-migrate-dry: ### Dry run development migrations generation & application
	docker exec -it ${APP_NAME}-api sh -c "npx prisma migrate dev --create-only"

.PHONY: install
install: ### Install dependencies in & outside of Docker
	docker exec -it ${APP_NAME}-api sh -c "npm install" && npm install
