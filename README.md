# Unit Testing Assignment - Dog API

This folder contains the **server-side** unit tests required by the assignment.

## What to copy into the starter template repo

Copy these files into your cloned repo:

- `server/tests/dogService.test.ts`
- `server/tests/dogController.test.ts`
- `server/tests/dogRoutes.test.ts`

If your repo is missing test dependencies, update `server/package.json` devDependencies to include:
- vitest
- supertest (+ @types/supertest)
- @vitest/coverage-v8 (optional but recommended)

## Run

From the project root:

```bash
cd server
npm install
npm test
```

## Notes about the endpoints

The backend mounts routes at `/api/dogs` (plural), so the endpoint under test is:

- `GET /api/dogs/random`
