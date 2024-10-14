import type { Context } from "https://deno.land/x/oak@v17.1.0/context.ts";

export async function logger(ctx: Context, next: () => Promise<unknown>) {
    const { method, url } = ctx.request;
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${duration}ms`);
    console.log(`${method} ${url} - ${duration}ms`);
}
