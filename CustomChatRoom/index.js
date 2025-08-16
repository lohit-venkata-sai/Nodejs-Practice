const chatRoom = require("./chat-room.js");

const chat = new chatRoom();
chat.on("joined", (user) => {
  console.log(`${user} joined the chat`);
});
chat.on("leave", (user) => {
  console.log(`${user} left the room`);
});
chat.on("error", (error) => {
  console.error(`Error Occured : ${error.message}`);
});

chat.on("new:message", ({ user, msg }) => {
  console.log(`${user} : ${msg}`);
});

chat.join("Tony");
chat.join("Peter");

chat.sendMessage(
  "Tony",
  "If u cant do anything without your suit, It should not be with you😡😡😡"
);
chat.sendMessage("Peter", "Mr.stark, I am sorry. I thought I can handle it");
chat.sendMessage("Peter", "Try to listen to me, pls...😔😔");

chat.leaveUser("Tony");
