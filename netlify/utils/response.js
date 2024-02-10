export function makeResponse(data, status = 200) {
  return {
    statusCode: status,
    body: JSON.stringify(data),
  };
}

export const statuses = {
  OK: 200,
  UNPROCESSABLE: 422,
  UNAUTHORIZED: 401,
};
