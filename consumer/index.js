const { Kafka } = require("kafkajs");

const client = new Kafka({
  clientId: "transfer-app",
  brokers: [process.env.INTERNAL_KAFKA_ADDR],
});
const admin = client.admin();
const child_process = require("child_process");

const interval_id = setInterval(() => {
  admin.listTopics((err, res) => {
    if (res[1].metadata[process.env.TOPIC]) {
      console.log("Kafka topic created");
      clearInterval(interval_id);
      child_process.execSync("npm start", { stdio: "inherit" });
    } else {
      console.log("Waiting for Kafka topic to be created");
    }
  });
}, 1000);
