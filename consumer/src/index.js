import { Kafka } from "kafkajs";

const consumer = Kafka.consumer();

await consumer.connect();
await consumer.subscribe({ topic: process.env.TOPIC });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
    console.log("====================================");
  },
});

run().catch(console.error);
