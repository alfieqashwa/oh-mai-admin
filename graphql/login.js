export const GET_LOGIN = `{
  currentUser {
      id,
      email,
      first_name
    }
  }`;

export const LOGIN_MUTATION = `mutation loginMutation($email: String!, $password: String!){
  login(email: $email, password: $password){
        id
        token
    }
}`;

export const LOGOUT = `mutation {
  logout
}`;
