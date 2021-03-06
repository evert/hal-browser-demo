PATH:=./node_modules/.bin:$(PATH)

.PHONY:build
build:
	tsc

.PHONY:test
test:
	nyc mocha

.PHONY:lint
lint:
	tslint -p .

.PHONY:lint-fix
lint-fix:
	tslint -p . --fix

.PHONY:watch
watch:
	tsc --watch

.PHONY:run
run: build
	node dist/index.js

package-lock.json: package.json
	npm i
