import { PostgresError } from "postgres";
import type postgres from "postgres";

export async function getAllSpecialties(db: postgres.Sql<{}>, headers: any) {
  try {
    const specialties = await db`SELECT * FROM specialties`;

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
      await db`SELECT * FROM appointments WHERE id_doctor = ${id_doctor} AND canceled = 0`;

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
      await db`SELECT * FROM patients WHERE cpf = ${requestBody.cpf}`;

    if (!patient.length) {
      patient =
        await db`INSERT INTO patients (cpf, name) VALUES (${requestBody.cpf}, ${requestBody.name}) RETURNING id`;
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

export async function getAppointment(
  db: postgres.Sql<{}>,
  headers: any,
  cpf: string | null
) {
  try {
    if (!cpf) {
      return new Response(null, {
        status: 400,
        statusText: "failed",
        headers,
      });
    }

    let patient = await db`SELECT * FROM patients WHERE cpf = ${cpf}`;

    if (!patient.length) {
      return new Response(null, {
        status: 404,
        statusText: "failed",
        headers,
      });
    }

    let patientAppointments =
      await db`SELECT * FROM appointments WHERE id_patient = ${patient[0]["id"]}`;

    const appointments = await Promise.all(
      patientAppointments.map(async (appointment) => {
        const doctor =
          await db`SELECT name, id_specialty FROM doctors WHERE id = ${appointment["id_doctor"]}`;
        const specialty =
          await db`SELECT name FROM specialties WHERE id = ${doctor[0]["id_specialty"]}`;
        const patient =
          await db`SELECT name FROM patients WHERE id = ${appointment["id_patient"]}`;

        return {
          id: appointment["id"],
          doctor: doctor[0]["name"],
          specialty: specialty[0]["name"],
          date: appointment["date"],
          patient: patient[0]["name"],
          canceled: appointment["canceled"],
        };
      })
    );

    return new Response(JSON.stringify(appointments), {
      status: 200,
      statusText: "success",
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: "failed",
      headers,
    });
  }
}

export async function cancelAppointment(
  db: postgres.Sql<{}>,
  headers: any,
  id_appointment: string | null
) {
  try {
    if (!id_appointment) {
      return new Response(null, {
        status: 400,
        statusText: "failed",
        headers,
      });
    }

    const appointment =
      await db`SELECT * FROM appointments WHERE id = ${id_appointment}`;

    if (!appointment.length) {
      return new Response(null, {
        status: 404,
        statusText: "failed",
        headers,
      });
    }

    const alteredAppointment =
      await db`UPDATE appointments SET canceled = 1 WHERE id = ${id_appointment}`;

    console.log("alteredAppointment", alteredAppointment);
    return new Response("penis", {
      status: 200,
      statusText: "success",
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: "failed",
      headers,
    });
  }
}
