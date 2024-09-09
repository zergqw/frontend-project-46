install:
				npm install
publish:
				npm publish --dry-run
gendiff:
				npm link
lint:
				npx eslint .
test:
				npm test
test-coverage:
				npm run test -- --coverage --coverageProvider=v8