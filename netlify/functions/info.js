export default async (req, context) => {
  return new Response({ req, context });
};
