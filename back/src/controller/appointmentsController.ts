import type postgres from "postgres";

export async function getAllSpecialties(db: postgres.Sql<{}>, headers: any) {
  try {
    const specialties = await db`SELECT * from specialties`;

    return new Response(JSON.stringify(specialties), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Erro ao retornar todas as especialidades: ", error);
    return new Response("Erro ao retornar especialidades", {
      status: 500,
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

    return new Response(JSON.stringify(doctors), { status: 200, headers });
  } catch (error) {
    console.error(
      "Erro ao retornar os médicos relacionados à uma especialidade: ",
      error
    );
    return new Response("Erro ao retornar especialidades", {
      status: 500,
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

    return new Response(JSON.stringify(dates), { status: 200, headers });
  } catch (error) {
    console.error("Erro ao retornar as consultas do médico: ", error);
    return new Response("Erro ao retornar consultas", {
      status: 500,
      headers,
    });
  }
}
