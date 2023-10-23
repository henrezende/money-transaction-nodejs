import express from "express";
import { Kafka } from "kafkajs";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

const kafka = new Kafka({
  clientId: "transfer-app",
  brokers: [process.env.INTERNAL_KAFKA_ADDR],
  idempotent: true,
  retry: {
    initialRetryTime: 400,
    retries: 6,
  },
});

const producer = kafka.producer();

app.use((req, res, next) => {
  req.producer = producer;

  return next();
});
app.use(bodyParser.json());
app.use(routes);

async function run() {
  app.listen(3000);
}

run().catch(console.error);
