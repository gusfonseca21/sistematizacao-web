import {
  getAllSpecialties,
  getDoctorDates,
  getSpecialtyDoctor,
} from "./controller/appointmentsController";
import { connectDatabase } from "./persistency/connection";

const db = await connectDatabase();

const headers = new Headers({
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
});

const server = Bun.serve({
  port: 3000,
  async fetch(request: Request) {
    if (!db)
      return new Response("Erro: não há conexão com o banco de dados", {
        status: 500,
      });

    const { method } = request;
    const { pathname, searchParams } = new URL(request.url);

    const splittedPath = pathname.split("/");
    const resource = splittedPath[1];
    const service = splittedPath[2];

    if (resource === "appointments") {
      if (method === "GET" && service === "specialties") {
        return getAllSpecialties(db, headers);
      }

      if (method === "GET" && service === "doctors") {
        return getSpecialtyDoctor(
          db,
          headers,
          Number(searchParams.get("id_specialty"))
        );
      }

      if (method === "GET" && service === "dates") {
        return getDoctorDates(
          db,
          headers,
          Number(searchParams.get("id_doctor"))
        );
      }
    }

    return new Response("Não encontrado", { status: 404, headers });
  },
});

console.log(`Servidor rodando na porta ${server.port}`);

process.on("uncaughtException", (err: Error) => {
  console.error("Exceção não tratada. Desligando o servidor...");
  console.error(err);
  server.stop();
});
