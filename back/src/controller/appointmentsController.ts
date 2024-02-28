import { PostgresError } from "postgres";
import type postgres from "postgres";

export async function getAllSpecialties(db: postgres.Sql<{}>, headers: any) {
  try {
    const specialties = await db`SELECT * from specialties`;

    return new Response(JSON.stringify(specialties), {
      status: 200,
      statusText: "success",
      headers,
    });
  } catch (error) {
    console.error("Erro ao retornar todas as especialidades: ", error);
    return new Response(null, {
      status: 500,
      statusText: "failed",
      headers,
    });
  }
}

export async function getSpecialtyDoctor(
  db: postgres.Sql<{}>,
  headers: any,
  id_specialty: number
) {
  try {
    const doctors =
      await db`SELECT * FROM doctors WHERE id_specialty = ${id_specialty}`;

    return new Response(JSON.stringify(doctors), {
      status: 200,
      statusText: "success",
      headers,
    });
  } catch (error) {
    console.error(
      "Erro ao retornar os médicos relacionados à uma especialidade: ",
      error
    );
    return new Response(null, {
      status: 500,
      statusText: "failed",
      headers,
    });
  }
}

export async function getDoctorDates(
  db: postgres.Sql<{}>,
  headers: any,
  id_doctor: number
) {
  try {
    const dates =
      await db`SELECT * FROM appointments WHERE id_doctor = ${id_doctor}`;

    return new Response(JSON.stringify(dates), {
      status: 200,
      statusText: "success",
      headers,
    });
  } catch (error) {
    console.error("Erro ao retornar as consultas do médico: ", error);
    return new Response(null, {
      status: 500,
      statusText: "failed",
      headers,
    });
  }
}

export async function createAppointment(
  db: postgres.Sql<{}>,
  headers: any,
  requestBody: { cpf: string; name: string; id_doctor: string; date: string }
) {
  try {
    // Checar se o patient já está cadastrado. Se não, cadastrá-lo no BD
    let patient =
      await db`SELECT * FROM patients where cpf = ${requestBody.cpf}`;

    if (!patient.length) {
      patient =
        await db`INSERT INTO patients (cpf, name) values (${requestBody.cpf}, ${requestBody.name}) RETURNING id`;
    }

    const response =
      await db`INSERT INTO appointments (id_doctor, date, id_patient) VALUES (${requestBody.id_doctor}, ${requestBody.date}, ${patient[0]["id"]})`;

    return new Response(JSON.stringify(response), {
      status: 201,
      statusText: "success",
      headers,
    });
  } catch (error) {
    // Erro 23505 = duplicate key value violates unique constraint "unique_appointment (id_patient - date)"
    if ((error as PostgresError).code === "23505") {
      return new Response(null, {
        status: 409,
        statusText: "failed",
        headers,
      });
    } else {
      return new Response(null, {
        status: 500,
        statusText: "failed",
        headers,
      });
    }
  }
}
