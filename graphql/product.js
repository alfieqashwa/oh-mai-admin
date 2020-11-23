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
      categories
    }
  }`;

export const GET_PRODUCT_FROM_SLUG = `query getProductFromSlug($filter: UserFilter)
  {
    products(filter: $filter) {
      sku
      product_name
      featured_image
      images
      kol_id
      base_price
      sale_price
      slug
      description
      on_sale
      stock_quantity
      stock_status
      categories
      tags
    }
  }`;

export const CREATE_PRODUCT = `mutation createproduct(
    $sku: String,
    $product_name: String,
    $featured_image: String,
    $images: [String],
    $kol_id: String,
    $base_price: Float,
    $sale_price: Float,
    $slug: String,
    $description: String,
    $on_sale: Boolean,
    $stock_quantity: Int,
    $stock_status: String,
    $categories: [String],
    $tags: [String],
  ){
    createProduct(
      sku: $sku
      product_name: $product_name
      featured_image: $featured_image
      images: $images
      kol_id: $kol_id
      base_price: $base_price
      sale_price: $sale_price
      slug: $slug
      description: $description
      on_sale:  $on_sale
      stock_quantity: $stock_quantity
      stock_status: $stock_status
      categories: $categories
      tags: $tags
    ){
      id
    }
  }
  `;

export const UPDATE_PRODUCT = `mutation updateProduct(
    $sku: String,
    $product_name: String,
    $featured_image: String,
    $images: [String],
    $kol_id: String,
    $base_price: Float,
    $sale_price: Float,
    $slug: String,
    $description: String,
    $on_sale: Boolean,
    $stock_quantity: Int,
    $stock_status: String,
    $categories: [String],
    $tags: [String],
  ){
    updateProduct(
      sku: $sku
      product_name: $product_name
      featured_image: $featured_image
      images: $images
      kol_id: $kol_id
      base_price: $base_price
      sale_price: $sale_price
      slug: $slug
      description: $description
      on_sale:  $on_sale
      stock_quantity: $stock_quantity
      stock_status: $stock_status
      categories: $categories
      tags: $tags
    ){
      id
    }
  }
  `;
