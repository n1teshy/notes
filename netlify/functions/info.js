exports.handler = async (event) => {
  try {
    return {
      body: JSON.stringify(event, nulll, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }, null, 2),
    };
  }
};
