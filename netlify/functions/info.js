exports.handler = async (event) => {
  try {
    return new Response(JSON.stringify(event));
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
