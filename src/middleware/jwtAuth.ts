import { verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import type { Context } from "https://deno.land/x/oak@v17.1.0/context.ts";
import { createKey } from "../utils/cryptoUtils.ts";

const SECRET = "your-256-bit-secret";
const KEY = await createKey(SECRET);

export async function jwtAuth(ctx: Context, next: () => Promise<unknown>) {
    const authHeader = ctx.request.headers.get("Authorization");

    // Check if the authorization header is present and valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        ctx.response.status = 401;
        throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = await verify(token, KEY);
        // Attach the payload to the context (can be used in the app)
        ctx.state.user = payload;
        await next();
    } catch (_error) {
        ctx.response.status = 403;
        throw new Error("Invalid token");
    }
}
