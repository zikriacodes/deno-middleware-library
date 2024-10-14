import { assertEquals, assertRejects } from "@std/assert";
import { createMockContext, createMockNext } from "https://deno.land/x/oak@v17.1.0/testing.ts";
import { jwtAuth } from "../src/index.ts";

Deno.test("JWT Auth - Valid Token", async () => {
    const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const ctx = createMockContext({
        headers: [["Authorization", `Bearer ${validToken}`]],
    });
    const next = createMockNext();

    await jwtAuth(ctx, next);

    assertEquals(ctx.state.user, { 
        "sub": "1234567890",
        "name": "John Doe",
        "iat": 1516239022
     });
});

Deno.test("JWT Auth - Invalid Token", async () => {
    const invalidToken = "invalid-token";
    const ctx = createMockContext({
        headers: [["Authorization", `Bearer ${invalidToken}`]],
    });
    const next = createMockNext();

    await assertRejects(
        async () => {
            await jwtAuth(ctx, next);
        },
        Error,
        "Invalid token"
    );
});

Deno.test("JWT Auth - No Token", async () => {
    const ctx = createMockContext();
    const next = createMockNext();

    await assertRejects(
        async () => {
            await jwtAuth(ctx, next);
        },
        Error,
        "No token provided"
    );
});
