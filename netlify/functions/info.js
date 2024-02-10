exports.handler = async (event) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(event, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
