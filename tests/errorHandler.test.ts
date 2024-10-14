import { assertEquals } from "@std/assert";
import { createMockContext, createMockNext } from "https://deno.land/x/oak@v17.1.0/testing.ts";
import { errorHandler } from "../src/index.ts";

Deno.test("Error Handler - Handles Errors", async () => {
    const ctx = createMockContext();
    const next = () => {
        throw new Error("Test Error");
    };

    await errorHandler(ctx, next);
    
    assertEquals(ctx.response.status, 500);
    assertEquals(ctx.response.body, { message: "Internal Server Error" });
});

Deno.test("Error Handler - No Errors", async () => {
    const ctx = createMockContext();
    const next = createMockNext();

    await errorHandler(ctx, next);
    
    // If no errors are thrown, the status should still be 200 (default)
    assertEquals(ctx.response.status, 200);
});
