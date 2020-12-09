export const kols = `{
  kols {
    id,
    display_name,
    slug,
    bank_details{
      bank,
      bank_account_number,
      bank_code,
      bank_branch_code,
      swift_code,
    },
    approved,
    banner_image,
    profile_image,
    description,
    social_medias{
      facebook,
      twitter,
      instagram,
      youtube,
    },
    featured,
    products{
      id,
      product_name,
      slug,
      current_price,
      categories
    }
    user_id,
  }
}`;

export const KOL_USER_INFO = `query getKOL($id: ID)
{
  user(id: $id){
    id,
    first_name,
    last_name,
    email,
    contact_number
  }
}

`;

export const FIND_EXIST_USER = `query findExistingUser($email: String)
{
  user(email: $email){
    id,
    
  }
}

`;

export const GET_KOL_FROM_SLUG = `query getKOLFromSlug($filter: KOLFilter)
{
  kols(filter: $filter) {
    display_name,
    slug,
    bank_details{
      bank,
      bank_account_number,
      bank_code,
      bank_branch_code,
      swift_code,
    },
    approved,
    banner_image,
    profile_image,
    description,
    social_medias{
      facebook,
      twitter,
      instagram,
      youtube,
    },
    featured,
    products{
      product{
        id,
        product_name,
        slug,
        current_price,
        categories,
        kol_profit
      }
      kol_profit
    }
    user_id
  }
}`;

export const CREATE_KOL = `mutation createKOL(
  $first_name: String
  $last_name: String
  $display_name: String
  $email: String
  $password:String
  $contact_number: Int
  $slug: String
  $bank_details: BankDetailsInput
  $approved: Boolean
  
  $description: String
  $featured: Boolean
  $social_medias: SocialMediaInput
  $new_banner_image: Upload
  $new_profile_image: Upload
  $products_id: [ProductInput]
  ){
    createKol(
      first_name: $first_name
      last_name: $last_name
      display_name: $display_name
      email: $email
      password: $password
      contact_number: $contact_number
      slug: $slug
      bank_details: $bank_details
      approved: $approved
     
      description: $description
      featured: $featured
      social_medias: $social_medias
      new_banner_image: $new_banner_image
      new_profile_image: $new_profile_image
      products: $products_id
    ){
      id
    }
  }
`;

export const UPDATE_KOL = `mutation updateKOL(
  $first_name: String
  $last_name: String
  $display_name: String
  $email: String
  $contact_number: Int
  $slug: String
  $bank_details: BankDetailsInput
  $approved: Boolean
  
  $description: String
  $featured: Boolean
  $social_medias: SocialMediaInput
  $new_banner_image: Upload
  $new_profile_image: Upload
  $products_id: [ProductInput]
  $id: ID
  ){
    updateKol(
      userID: $id
      first_name: $first_name
      last_name: $last_name
      display_name: $display_name
      email: $email
      contact_number: $contact_number
      slug: $slug
      bank_details: $bank_details
      approved: $approved
      description: $description
      featured: $featured
      social_medias: $social_medias
      new_banner_image: $new_banner_image
      new_profile_image: $new_profile_image
      products: $products_id
    ){
      id
    }
  }
`;

export const DELETE_KOL = `mutation deleteKol(
  $id: ID
  ){
    deleteKol(id: $id)
  }
`;
