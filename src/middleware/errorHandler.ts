import type { Context } from "https://deno.land/x/oak@v17.1.0/context.ts";

export async function errorHandler(ctx: Context, next: () => Promise<unknown>) {
    try {
        await next();
        ctx.response.status = 200;
    } catch (error) {
        console.error("Error:", error);
        ctx.response.status = 500;
        ctx.response.body = { message: "Internal Server Error" };
    }
}
