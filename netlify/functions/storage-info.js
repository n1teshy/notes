import os from "os";

const path = os.platform() === "win32" ? "C:" : "./";

export default async (req, context) => {
  return new Response(String(Object.getPrototypeOf(req.body)));
};
