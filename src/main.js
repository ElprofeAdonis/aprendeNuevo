// playlist/src/main.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const nuevoArtist = await prisma.artist.create({
    data: {
      name: "Adonis Aleman",
      email: "adonisaleman60@gmail.com",
      songs: {
        create: {
          title: "Soy futuro ingeniero",
        },
      },
    },
  });
  console.log("Nuevo artista creado: ", nuevoArtist);

  const todosArtists = await prisma.artist.findMany({
    include: { songs: true },
  });
  console.log("Todos los artistas: ");
  console.dir(todosArtists, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.disconnect());
