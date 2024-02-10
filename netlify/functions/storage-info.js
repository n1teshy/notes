export default async (req, context) => {
  try {
    return new Response(req.body);
  } catch (e) {
    return new Response({ message: e.message }, { status: 500 });
  }
};
