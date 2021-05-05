import { gql } from "graphql-request";

export const products = `{
    products {
      id,
      sku,
      product_name,
      featured_image,
      current_price,
      on_sale,
      sale_price,
      slug,
      categories,
      tags,
      stock_quantity,
      stock_status
      kol_profit
    }
  }`;

export const GET_PRODUCT_FROM_SLUG = `query getProductFromSlug($filter: UserFilter)
  {
    products(filter: $filter) {
      id
      sku
      product_name
      featured_image
      images
      base_price
      sale_price
      slug
      description
      on_sale
      stock_quantity
      stock_status
      categories
      tags
      kol_profit
    }
  }`;

export const CREATE_PRODUCT = `mutation createproduct(
    $sku: String,
    $product_name: String,
    $base_price: Float,
    $sale_price: Float,
    $slug: String,
    $description: String,
    $on_sale: Boolean,
    $stock_quantity: Int,
    $stock_status: String,
    $categories: [String],
    $tags: [String],
    $new_featured_image: Upload,
    $images_file:[Upload]
    $kol_profit: Int
    $company_profit: Int
  ){
    createProduct(
      sku: $sku
      product_name: $product_name
      base_price: $base_price
      sale_price: $sale_price
      slug: $slug
      description: $description
      on_sale:  $on_sale
      stock_quantity: $stock_quantity
      stock_status: $stock_status
      categories: $categories
      tags: $tags
      new_featured_image: $new_featured_image
      images_file: $images_file
      kol_profit: $kol_profit
      company_profit: $company_profit
    ){
      id
    }
  }
  `;

export const UPDATE_PRODUCT = `mutation updateProduct(
    $sku: String,
    $product_name: String,
    $base_price: Float,
    $sale_price: Float,
    $slug: String,
    $description: String,
    $on_sale: Boolean,
    $stock_quantity: Int,
    $stock_status: String,
    $categories: [String],
    $tags: [String],
    $new_featured_image: Upload,
    $images_file:[Upload]
    $kol_profit: Int
    $company_profit: Int
  ){
    updateProduct(
      sku: $sku
      product_name: $product_name
      base_price: $base_price
      sale_price: $sale_price
      slug: $slug
      description: $description
      on_sale:  $on_sale
      stock_quantity: $stock_quantity
      stock_status: $stock_status
      categories: $categories
      tags: $tags
      new_featured_image: $new_featured_image
      images_file: $images_file
      kol_profit: $kol_profit
      company_profit: $company_profit
    ){
      id
    }
  }
  `;

export const DELETE_PRODUCT = `mutation deleteProduct(
  $id: ID
  ){
    deleteProduct(id: $id)
  }
  `;

export const GET_PRODUCT_GQL = gql`
  query getProductByID($id: ID)
  {
    getProductByID(id: $id) {
      id
      sku
      product_name
      featured_image
      images
      base_price
      sale_price
      current_price
      slug
      description
      on_sale
      stock_quantity
      stock_status
      categories
      tags
      kol_profit
      active_status
      is_physical
      weight
    }
  }`

export const UPDATE_PRODUCT_GQL = gql`
mutation updateProduct(
  $sku: String
  $product_name: String
  $base_price: Float
  $sale_price: Float
  $current_price: Float
  $slug: String
  $description: String
  $on_sale: Boolean
  $stock_quantity: Int
  $stock_status: String
  $categories: [String]
  $tags: [String]
  $new_featured_image: Upload
  $images_file: [Upload]
  $kol_profit: Int
  $company_profit: Int
  $is_physical: Boolean
  $weight: Float
)
{
  updateProduct(
    sku: $sku
    product_name: $product_name
    base_price: $base_price
    sale_price: $sale_price
    current_price: $current_price
    slug: $slug
    description: $description
    on_sale: $on_sale
    stock_quantity: $stock_quantity
    stock_status: $stock_status
    categories: $categories
    tags: $tags
    new_featured_image: $new_featured_image
    images_file: $images_file
    kol_profit: $kol_profit
    company_profit: $company_profit
    is_physical: $is_physical
    weight: $weight
  ) {
    sku
    product_name
    base_price
    sale_price
    current_price
    slug
    description
    on_sale
    stock_quantity
    stock_status
    categories
    tags
    kol_profit
    company_profit
    is_physical
    weight
  }
}`