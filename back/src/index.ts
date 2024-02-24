import { dbConnect } from "./database";

const server = Bun.serve({
  port: 8080,
  fetch(req) {
    return new Response("Bun!");
  },
});

dbConnect();

console.log(`Servidor rodando na porta ${server.port}`);
