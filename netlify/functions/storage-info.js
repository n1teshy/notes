// import { check } from "diskusage";
import os from "os";

// const path = os.platform() === "win32" ? "C:" : "/";

export default async (req, context) => {
  return new Response("Im alive");
  // check(path, (err, info) => {
  //   if (err) {
  //     return new Response("error", { status: 500 });
  //   }
  //   return new Response("info");
  // });
};
