const candidates = require("../../candidatesData/users_2000.json");

exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify({ candidates }),
  };
};
