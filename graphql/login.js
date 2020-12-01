export const GET_LOGIN = `{
    currentConsumer {
      id,
    }
  }`;

export const LOGIN_MUTATION = `mutation loginMutation($email: String!, $password: String!){
    consumerLogin(email: $email, password: $password){
        id
    }
}`;
