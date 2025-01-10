const axios = require("axios");
const key = process.env.HUNTER_API_KEY;

const verifyEmail = async (email) => {
  try {
    const res = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${key}`
    );

    return res.data.data.result === "deliverable";
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports = { verifyEmail };
