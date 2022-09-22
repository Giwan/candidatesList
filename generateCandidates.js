const casual = require("casual");
const moment = require("moment");
const fs = require("fs");

const positionsList = [
  "developer",
  "marketing",
  "tester",
  "designer",
  "strategist",
  "administrator",
];

const applicationStatusList = ["rejected", "waiting", "approved"];

export const calcBirthDay = (age) => {
  const _year = new Date().getFullYear() + 1;
  const day = casual.integer(1, 28);
  const month = casual.integer(1, 12);
  const year = _year - age;
  return `${year}-${month}-${day}`;
}

casual.define("user", function () {
  const applicationDay = casual.integer(0, 15);
  return {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    dob: calcBirthDay(casual.integer(24, 55)),
    experience: casual.integer(0, 15),
    position: casual.random_element(positionsList),
    dateOfApplication: moment()
      .subtract(applicationDay, "days")
      .format("yyyy-MM-DD"),
    statusOfApplication: casual.random_element(applicationStatusList),
  };
});

let applicants = [];
const numberOfApplicants = 2000;

for (let i = 0; i < numberOfApplicants; i++) {
  applicants.push(casual.user);
}

fs.writeFileSync(
  `./candidatesData/users_${numberOfApplicants}.json`,
  JSON.stringify(applicants)
);
