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

export const REGISTER = `mutation createConsumer($firstname: String!, $lastname: String!, $email: String!, $password:String!){
  createConsumer(
    first_name: $firstname
    last_name: $lastname
    email: $email
    password: $password
    contact_number: ""
    cart: []
    billing_address: []
    shipping_address: []
  ){
    id
  }

}`;
