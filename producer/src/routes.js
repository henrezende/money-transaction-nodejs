import express from "express";
import { CompressionTypes } from "kafkajs";

const routes = express.Router();

routes.post("/transfer", async (req, res) => {
  await req.producer.connect();
  const message = {
    user: { id: 1, name: "teste" },
    grade: 10,
  };

  console.log("22--------------------------------------");

  await req.producer.send({
    topic: process.env.TOPIC,
    compression: CompressionTypes.GZIP,
    messages: [{ value: JSON.stringify(message) }],
  });

  await req.producer.disconnect();

  return res.json({ ok: true });
});

export default routes;
