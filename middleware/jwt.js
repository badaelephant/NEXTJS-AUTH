import jsonwebtoken from "jsonwebtoken";

const createToken = async (id, email) => {
  const token = await jsonwebtoken.sign({ id, email }, "secret", {
    expiresIn: "10d",
  });
  return token;
};

const jwt = { createToken };

export default jwt;
