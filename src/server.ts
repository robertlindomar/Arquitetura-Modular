import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({
    logger: true,
});

const start = async () => {

    await app.register(fastifyCors);
    await app.register(routes);

    try {
        await app.listen({ port: 3333 })
    } catch (err) {
        process.exit(1);
    }
}

start();
