const candidates = require("../../candidatesData/users_2000.json");

const headers = {
  "Content-Type": "application/json",
  "access-control-allow-origin": "*",
}

const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
}

exports.handler = async function () {
  // Randomly cause the backend to fail.
  if (getRandomInt(5) === 4) {
    return {
      statusCode: 404,
      headers
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ candidates }),
  };
};
