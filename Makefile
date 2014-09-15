REPORTER?=spec
MOCHA_OPTS=--reporter $(REPORTER) \
					 --ui tdd \
					 --profile-base ./profile.js

.PHONY: default
default: lint test

b2g:
	./node_modules/.bin/mozilla-download --verbose --product b2g $@

.PHONY: lint
lint:
	gjslint --recurse . \
					--disable "220,255" \
					--exclude_directories "b2g,node_modules"

.PHONY: test
test: b2g
	./node_modules/.bin/marionette-mocha $(MOCHA_OPTS) \
	  $(wildcard test/*_test.js)
