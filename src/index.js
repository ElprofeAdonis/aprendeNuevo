// playlist/src/index.ts

// #1
import { PrismaClient } from "@prisma/client";
import express from "express";

// #2
const prisma = new PrismaClient();

// #3
const app = express();

// #4
app.use(express.json());

// #5
app.get("/artists", async (req, res) => {
  const artists = await prisma.artist.findMany();
  res.json({
    success: true,
    payload: artists,
    message: "Operation Successful",
  });
});

app.get(`/song/:id`, async (req, res) => {
  const { id } = req.params;
  const song = await prisma.song.findFirst({
    where: { id: Number(id) },
  });
  res.json({
    success: true,
    payload: song,
  });
});

//* 3. Creates a new artist.
app.post(`/artist`, async (req, res) => {
    const result = await prisma.artist.create({
        data: { ...req.body },
    })
    res.json({
        success: true,
        payload: result,
    })
})

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// #6
app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
