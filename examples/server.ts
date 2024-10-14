import { Application } from "https://deno.land/x/oak@v17.1.0/application.ts";
import { logger, errorHandler } from "../src/index.ts";

const app = new Application();

app.use(errorHandler);
app.use(logger);

app.use((ctx) => {
    ctx.response.body = "Hello, Deno!";
});

await app.listen({ port: 8000 });
