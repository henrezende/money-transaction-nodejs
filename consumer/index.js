import { Kafka } from "kafkajs";
import { consumeMessage } from "./src/consumer";

async function run() {
  const kafka = new Kafka({
    clientId: "transfer-app",
    brokers: [process.env.INTERNAL_KAFKA_ADDR],
    retry: {
      initialRetryTime: 1000,
      retries: 10,
    },
  });

  const consumer = kafka.consumer({ groupId: "transfer-group" });

  await consumer.connect();
  await consumer.subscribe({
    topics: [
      process.env.TOPIC_TRANSFER,
      process.env.TOPIC_DEPOSIT,
      process.env.TOPIC_WITHDRAW,
    ],
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      consumeMessage(topic, message);
    },
  });
}

run().catch(console.error);
