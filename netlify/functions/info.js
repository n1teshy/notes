import net from "net";
import { makeResponse } from "../utils/response.js";

exports.handler = async (req, context) => {
  try {
    const socket = net.createServer((conn) => {
      conn.setEncoding("utf8");
      conn.on("data", (data) => {
        conn.write(`server recieved: ${data}`);
      });
    });
    socket.listen(3000);
    return makeResponse({ message: "done" });
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
