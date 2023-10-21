import express from "express";
import { Kafka } from "kafkajs";

import routes from "./routes";

const app = express();

const kafka = new Kafka({
  clientId: "transfer-app",
  brokers: [process.env.INTERNAL_KAFKA_ADDR],
  retry: {
    initialRetryTime: 400,
    retries: 5,
  },
});

const producer = kafka.producer();

app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use(routes);

async function run() {
  // await producer.connect();
  app.listen(3000);
}

run().catch(console.error);
