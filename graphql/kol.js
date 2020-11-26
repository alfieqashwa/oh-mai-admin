export const kols = `{
  kols {
    id,
    display_name,
    banner_image,
    profile_image,
    description,
    social_medias{
      facebook,
      twitter,
      instagram,
      youtube,
    },
    slug,
    products{
      product_name,
      slug,
      current_price,
      categories
    }
  }
}`;

export const GET_KOL_FROM_SLUG = `query getKOLFromSlug($slug:String)
  {
    kols(slug:$slug) {
      display_name,
      banner_image,
      profile_image,
      description,
      social_medias{
        facebook,
        twitter,
        instagram,
        youtube,
      },
      slug,
      products{
        product_name,
        slug,
        current_price,
        categories,
        featured_image
      }
    }
  }`;
