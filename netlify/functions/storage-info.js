export default async (req, context) => {
  try {
    return new Response(req.body);
  } catch (e) {
    status = 500;
    message = e.message;
  }
};
