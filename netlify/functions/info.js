import lambdaMultipart from "lambda-multipart";
import formidable from "formidable";

exports.handler = async (event) => {
  try {
    const formData = await lambdaMultipart.parse(event);
    const form = new formidable.IncomingForm();

    form.parse(formData, (err, fields, files) => {
      if (err) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Error parsing form data" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ fields, files }),
      };
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error parsing multipart form data" }),
    };
  }
};
