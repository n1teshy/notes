export default async (req, context) => {
  return new Response(JSON.stringify({ req, context }, null, 2));
};
