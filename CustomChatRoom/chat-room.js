const EventEmitter = require("events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }
  join(user) {
    if (this.users.has(user)) {
      this.emit("error", { message: "user doest exists" });
      return;
    }
    this.users.add(user);
    this.emit("joined", user);
  }
  sendMessage(user, msg) {
    if (!this.users.has(user)) {
      this.emit("error", { message: "user doest exists" });
      return;
    }
    this.emit("new:message", { user, msg });
  }
  leaveUser(user) {
    if (!this.users.has(user)) {
      this.emit("error", { message: "user doest exists" });
      return;
    }
    this.users.delete(user);
    this.emit("leave", user);
  }
}

module.exports = ChatRoom;
