require('dotenv').config({ path: '.env' })

process.env.PLAYWRIGHT_EXPERIMENTAL_FEATURES = '1'

module.exports = {
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  projects: [
    {
      name: 'e2e-chrome',
      outputDir: 'test-results',
      testMatch: '**/*.spec.js',
      use: {
        baseURL: process.env.MB_DEMO_URL,
        devices: ['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        bypassCSP: true,
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-gpu',
            '--disable-dev-shm-usage'
          ],
          headless: true
        }
      }
    },
    {
      name: 'e2e-firefox',
      outputDir: 'test-results',
      testMatch: '**/*.spec.js',
      use: {
        baseURL: process.env.MB_DEMO_URL,
        devices: ['Desktop Firefox'],
        viewport: { width: 1440, height: 900 },
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        bypassCSP: true,
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-gpu',
            '--disable-dev-shm-usage'
          ],
          headless: true
        }
      }
    }
  ]
}
