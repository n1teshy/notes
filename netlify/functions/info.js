import formidable from "formidable";

export default async (req, context) => {
  try {
    // return new Response(String(Object.getPrototypeOf(req)));
    const [fields, files] = await formidable({}).parse(req);
  } catch (e) {
    return new Response({ message: e.message }, { status: 500 });
  }
};
