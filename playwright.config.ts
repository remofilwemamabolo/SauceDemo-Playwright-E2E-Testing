import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    // where test files live
    testDir: './tests',

    // run tests in parallel
    fullyParallel: true,

    // fail the build on CI if tests are accidentally left with test.only
    forbidOnly: !!process.env.CI,

    // no retries locally, 2 retries on CI
    retries: process.env.CI ? 2 : 0,

    // reporters — list for terminal, html for the visual report
    reporter: [['list'], ['html', { open: 'never' }]],

    use: {
        // base URL so tests can use page.goto('/inventory.html') instead of full URL
        baseURL: 'https://www.saucedemo.com',

        // captures screenshot only when a test fails
        screenshot: 'only-on-failure',

        // records video only when a test fails
        video: 'retain-on-failure',

        // captures full trace on first retry — viewable in playwright trace viewer
        trace: 'on-first-retry',
    },

    // cross-browser testing across chromium, firefox and webkit
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});