export function consumeMessage(topic, message) {
  switch (topic) {
    case process.env.TOPIC_TRANSFER:
      performTransfer(message);
      break;

    case process.env.TOPIC_DEPOSIT:
      break;

    case process.env.TOPIC_WITHDRAW:
      break;

    default:
      break;
  }
}
function performTransfer(message) {
  const parsedMessage = JSON.parse(message.value.toString());
  console.log(parsedMessage.amount);
}
