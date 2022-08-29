import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/extend-expect";

import { server } from "mocks";

installGlobals();

// Establish msw API mocking before all tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
// Reset any msw request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up msw after the tests are finished.
afterAll(() => server.close());
