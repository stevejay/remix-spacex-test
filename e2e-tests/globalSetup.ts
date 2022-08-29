import type { FullConfig } from "@playwright/test";
// import { chromium } from "@playwright/test";
// import { webkit } from "@playwright/test";
// import fs from "fs";
// import path from "path";

/**
 * Create login storage state for the different organisations to be tested.
 * We need to do this because Auth0 rate-limits login attempts for each account,
 * plus it speeds up the execution of the e2e tests.
 */
async function globalSetup(config: FullConfig) {
  // const { baseURL } = config.projects[0].use;
  // const browser = await chromium.launch();
  // const context = await browser.newContext();
  // const page = await context.newPage();
  // try {
  //   await context.tracing.start({ screenshots: true, snapshots: true });
  //   await page.goto(baseURL!);
  //   //   await page.fill('input[name="user"]', 'user');
  //   //   await page.fill('input[name="password"]', 'password');
  //   //   await page.click('text=Sign in');
  //   //   await context.storageState({ path: storageState as string });
  //   await context.tracing.stop({
  //     path: "./test-results/setup-trace.zip",
  //   });
  //   await page.close();
  // } catch (error) {
  //   await context.tracing.stop({
  //     path: "./test-results/failed-setup-trace.zip",
  //   });
  //   await page.close();
  //   throw error;
  // }
}

export default globalSetup;
