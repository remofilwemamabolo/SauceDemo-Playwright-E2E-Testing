# SauceDemo-Playwright-E2E-Testing
created an automation for purchasing a product on the saucedemo website using playwright typescript

![Playwright Tests](https://github.com/remofilwemamabolo/SauceDemo-Playwright-E2E-Testing/actions/workflows/playwright.yml/badge.svg)

---

## Tech Stack

- [Playwright](https://playwright.dev/) — test framework
- [TypeScript](https://www.typescriptlang.org/) — language
- [GitHub Actions](https://github.com/features/actions) — CI/CD pipeline

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository
```bash
git clone https://github.com/remofilwemamabolo/SauceDemo-Playwright-E2E-Testing.git
cd SauceDemo-Playwright-E2E-Testing
```

2. Install dependencies
```bash
npm ci
```

3. Install Playwright browsers
```bash
npx playwright install
```

---

## How to Run Tests

### Run all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/purchaseProduct.spec.ts
```

### Run on a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View the HTML report after a run
```bash
npx playwright show-report
```

---

## Test Coverage

| Area | Tests |
|---|---|
| Login | Valid user, locked out user, invalid credentials |
| Product Listing | Product count, sort Z to A |
| Product Details | Name, price, description, image |
| Cart | Product name and price in cart |
| Checkout | Full e2e purchase flow with success confirmation |

---

## CI/CD

Tests run automatically on every push and pull request to `main` via GitHub Actions across **Chromium**, **Firefox** and **WebKit**. Screenshots and the HTML report are uploaded as artifacts on every run.
