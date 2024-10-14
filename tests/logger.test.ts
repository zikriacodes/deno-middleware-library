import { assertSpyCall, spy,  } from "@std/testing/mock";
import { assertEquals } from "@std/assert";
import { logger } from "../src/index.ts";
import { createMockContext, createMockNext } from "https://deno.land/x/oak@v17.1.0/testing.ts";

Deno.test("Logger middleware logs the request method and URL", async () => {
    const ctx = createMockContext({});
    const next = createMockNext();

    // Spy on console.log
    const consoleSpy = spy(console, "log");

    await logger(ctx, next);

    const expectedMethod = "GET";
    const expectedUrl = "http://localhost/";

    // Check that console.log was called with the expected method and url
    assertSpyCall(consoleSpy, 0);
    const duration = ctx.response.headers.get("X-Response-Time");
    assertEquals(consoleSpy.calls[0].args[0], `${expectedMethod} ${expectedUrl} - ${duration}`);

    consoleSpy.restore();
});