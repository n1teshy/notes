import net from "net";
import { makeResponse } from "../utils/response.js";

exports.handler = async (req, context) => {
  try {
    await new Promise((resolve, reject) => {
      const socket = net.createServer((conn) => {
        conn.setEncoding("utf8");
        conn.on("data", (data) => {
          conn.write(`server recieved: ${data}`);
        });
      });
      socket.on("listening", () => resolve());
      socket.on("error", (error) => reject(error));
      socket.listen(3000, "0.0.0.0");
    });
    return makeResponse({ message: "port opened." });
  } catch (error) {
    return makeResponse({ message: error.message }, error.status || 500);
  }
};
