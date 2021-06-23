import { LOGIN_MUTATION } from "graphql/login";
import { client, getClient } from "lib/graphqlclient";

const login = async (email, password) => {
  try {
    const a = await client.request(LOGIN_MUTATION, {
      email: email,
      password: password,
    });

    return a
  } catch (err) {
    console.log(err.response?.errors[0].message);
    if (
      err.response?.errors[0].message ==
      "Failed to serialize user into session"
    ) {
      throw err
    }
  }
}

module.exports = {
  login
}