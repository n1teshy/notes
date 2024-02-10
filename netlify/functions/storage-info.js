import fs from "fs/promises";

export default async (req, context) => {
  let status = 200;
  let message = "everything went well.";
  try {
    await fs.writeFile("file.txt", "hello I am a file");
  } catch (e) {
    status = 500;
    message = e.message;
  } finally {
    return new Response(message, { status });
  }
};
