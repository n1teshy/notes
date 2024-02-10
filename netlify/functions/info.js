import formidable from "formidable";

const parser = new formidable.IncomingForm();

export default async (req, context) => {
  try {
    const [fields, files] = await parser.parse(req.body);
    return new Response(JSON.stringify({ fields, files }));
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
};
