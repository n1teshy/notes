import formidable from "formidable";

export default async (req, context) => {
  try {
    // return new Response(String(Object.getPrototypeOf(req)));
    const [fields, files] = await formidable({}).parse(req);
    return new Response(JSON.stringify({ fields, files }));
  } catch (e) {
    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
    });
  }
};
