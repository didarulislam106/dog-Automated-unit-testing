# Unit Testing Assignment - Dog API

Complete implementation of 5 comprehensive tests for a Dog Image API with both API and E2E testing.

## Tests Implemented (10 points total)

### API Tests (Vitest + Supertest) - 4 points
- **Test 1 (2 pts)**: Positive API test - GET `/api/dogs/random` expects HTTP 200, `success=true`, and valid `imageUrl` string
- **Test 2 (2 pts)**: Negative API test - GET `/api/dogs/invalid` expects HTTP 404 error response

### E2E Tests (Playwright) - 6 points
- **Test 3 (2 pts)**: Page load test - Image loads automatically on page initialization with HTTPS validation
- **Test 4 (2 pts)**: Button click test - Image loads when user clicks "Load Random Dog" button with HTTPS validation
- **Test 5 (2 pts)**: Error handling test - Error message displays when API fails

## Project Structure

```
server/
├── src/
│   ├── app.ts              # Express application
│   ├── controllers/
│   │   └── dogController.ts
│   ├── routes/
│   │   └── dogRoutes.ts
│   └── services/
│       └── dogService.ts
├── tests/
│   └── api.test.ts         # Test 1 & 2 (API tests)
├── e2e/
│   └── dogApp.spec.ts      # Test 3, 4, 5 (E2E tests)
├── public/
│   └── index.html          # Frontend application
├── test.rest               # REST Client requests for manual testing
├── vitest.config.ts        # Vitest configuration
└── playwright.config.ts    # Playwright configuration
```

## Setup

```bash
cd server
npm install
```

## Running Tests

### API Tests (Test 1 & 2)
```bash
npm run test:run
```

### E2E Tests (Test 3, 4, 5)
```bash
npm run test:e2e
```

### View Playwright Report
```bash
npx playwright show-report
```

### Start Server
```bash
npm start
```
Server runs on `http://localhost:5050`

## API Endpoints

- `GET /api/dogs/random` - Returns random dog image with HTTPS URL
- `GET /api/health` - Health check endpoint

## Test Evidence

### REST Client (Test 1 & 2)
Open `test.rest` in VS Code and click "Send Request" buttons:
- TEST 1: Click to see HTTP 200 response with success=true and imageUrl
- TEST 2: Click to see HTTP 404 error response

### Playwright Report (Test 3, 4, 5)
Run `npx playwright show-report` to view detailed E2E test results across Chromium, Firefox, and WebKit browsers

### Browser Testing
Visit `http://localhost:5050` to manually test the frontend:
- Images load on page initialization
- Images load when clicking the "Load Random Dog" button
- Error message displays when API is unavailable

## Dependencies

- Express.js - Web framework
- TypeScript - Type safety
- Vitest - Unit testing framework
- Supertest - HTTP assertion library
- Playwright - E2E testing framework
- TSX - TypeScript execution
