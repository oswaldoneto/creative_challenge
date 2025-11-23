.PHONY: setup dev build preview lint fmt test

setup:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

fmt:
	npx prettier --write "src/**/*.{js,jsx,css}"

test:
	@echo "Tests not yet implemented"

