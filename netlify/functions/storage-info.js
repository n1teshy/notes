import { check } from "diskusage";
import os from "os";

const path = os.platform() === "win32" ? "C:" : "/";

export default async (req, context) => {
  check(path, (err, info) => {
    if (err) {
      return new Response(err.message, { status: 500 });
    }
    return new Response(JSON.stringify(info));
  });
};
