import { loader } from "./index";
import { server } from "mocks";
import { rest } from "msw";
import type { Launch } from "~/models/spacex.server";

const QUERY_URL = "https://api.spacexdata.com/v4/launches/query";

const LAUNCH_ONE = {
  details: "Launch 1 details",
  name: "Starlink 4-27 (v1.5)",
  date_utc: "2022-08-19T19:24:00.000Z",
  id: "62f3b5200f55c50e192a4e6c",
};

function installSearchHandler(
  response: { docs: readonly Launch[] },
  capturedRequest?: { current: string }
) {
  const handler = rest.post(QUERY_URL, async (req, res, ctx) => {
    if (capturedRequest) {
      capturedRequest.current = await req.json();
    }
    return res(ctx.json(response));
  });
  server.use(handler);
}

// Loader testing example: https://dev.to/felipefreitag/create-the-first-unit-test-for-your-remix-app-loaders-1fm6
describe("loader", () => {
  it("should return a response", async () => {
    const capturedRequest = { current: "" };
    installSearchHandler({ docs: [LAUNCH_ONE] }, capturedRequest);
    const response = await loader({
      request: new Request("https://example.com/spacex/launches?name=star"),
      params: {},
      context: {},
    });
    expect(await response.json()).toEqual({
      items: [
        {
          dateUtc: LAUNCH_ONE.date_utc,
          details: LAUNCH_ONE.details,
          id: LAUNCH_ONE.id,
          name: LAUNCH_ONE.name,
        },
      ],
    });
    expect(capturedRequest.current).toEqual({
      query: { upcoming: false, name: { $regex: "star", $options: "xi" } },
      options: {
        sort: { date_utc: "desc" },
        limit: 50,
        offset: 0,
        select: "id name date_utc details",
      },
    });
  });
});
