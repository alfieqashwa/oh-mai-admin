import { Header } from 'components/header'
import { ConfirmationSavedButton, Title, Media, ProductStatus, ProductVariants, ProductType, Inventory, Price, Shipping } from 'components/products/addProduct'
import { GET_PRODUCT_GQL, UPDATE_PRODUCT_GQL } from 'graphql/product'
import { getClient } from 'lib/graphqlclient'
import React, { useEffect, useState } from 'react'

const EditProduct = (props) => {
  console.log('start EditProduct...')

  const client = getClient()
  const { id } = props.query
  const variables = {
    id: id
  }
  const [product, setProduct] = useState(null)
  // try {
  //   const prodData = client.request(GET_PRODUCT_GQL, variables)
  //   console.log("Fetch product prodData", prodData)
  // } catch (error) {
  //   console.log("Fetch product error", error)
  // }
  // const {data, error} = client.request(GET_PRODUCT_GQL, variables)

  // const { data: product, error: prodError } = useSWR([
  //   GET_PRODUCT_FROM_SLUG,
  //   JSON.stringify({
  //     filter: { id: id },
  //   }),
  // ]);
  // console.log("Edit product id: ", id)
  // console.log("Edit product product: ", product)

  // if (prodError) {
  //   console.log("Edit product error: ", prodError)
  // }

  // if (product) {
  //   console.log("Edit product: ", product)
  // }

  // useEffect(() => {
  //   console.log("useEffect...")

  //   // if (error) {
  //   //   console.log("Edit product error: ", error)
  //   // }

  //   if (!product) {
  //     getData(variables, setProduct)
  //   } else {
  //     console.log("Edit product data: ", product)
  //   }
  // }, [product])

  useEffect(() => {
    console.log('Edit Product/ component did mount')

    client.request(GET_PRODUCT_GQL, variables).then((data) => {
      console.log('Data product', data)
      setProduct(data.getProductByID)
    }).catch(err => console.log('error product', err))
  }, [])

  useEffect(() => {
    console.log('Edit Product/ Product', product)
  }, [product])

  const update = () => {
    console.log('Update...')
    client.request(UPDATE_PRODUCT_GQL, product).then((data) => {
      console.log('Update success', data)
      setProduct(data.updateProduct)
    }).catch(err => console.log('error product', err))
  }

  const handleChange = (e) => {
    console.log('handleChange: product before update', product)
    const { id, value } = e.target
    console.log('handleChange: id', id)
    console.log('handleChange: value', value)

    let val = null

    if (value === 'true') {
      val = true
    } else if (value === 'false') {
      val = false
    } else {
      val = value
    }

    setProduct(prevState => ({
      ...prevState,
      [id]: val
    }))
  }

  return (
    <>
      <Header title="Edit Product" />

      {/* Discard Save Button Confirmation (??) on top of the page */}
      <ConfirmationSavedButton update={update} />

      <div className="mx-4 mt-16 md:mt-24">

        {/* Page Name */}
        <h3 className="hidden md:block">Edit Product</h3>

        <div className="flex items-center justify-between md:hidden">
          <h3>Edit Product</h3>
          <div className="w-1/2 py-4 md:p-4 md:w-full">
            <select className="w-full rounded-md text-N0 bg-opacity-20 bg-N200">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-2 md:space-x-6 md:flex">
          {/* Left Main Page */}
          <div className="space-y-5 md:space-y-reverse md:w-7/12">
            {/* Mobile View Only */}
            <div className="md:hidden">
              <ProductType>
                <p className="mt-2 w350">This product has variants.</p>
              </ProductType>
            </div>
            {/* Mobile View Only */}

            {/* Title */}
            <Title valDescription={product?.description} valTitle={product?.product_name}
              onChange={handleChange} />

            {/* Media */}
            <Media />

            {/* Product Variants */}
            <ProductVariants variants={product?.variations}/>

          </div>

          {/* Right Main Page */}
          <div className="space-y-5 md:pr-4 md:w-5/12">

            {/* Product Status */}
            <div className="hidden md:block">
              <ProductStatus onChange={handleChange} value={product?.active_status} />
            </div>

            {/* Product Type */}
            <div className="hidden md:block">
              <ProductType>
                <p className="hidden mt-2 md:block w350">This product is available on OhMai and KOL stores.</p>
              </ProductType>
            </div>

            {/* Inventory */}
            <Inventory sku={product?.sku} quantity={product?.stock_quantity} onChange={handleChange} />

            {/* Price */}
            <Price basePrice={product?.base_price} costPrice={product?.cost_price}
              salePrice={product?.sale_price}
              isOnSale={product?.on_sale}
              onChange={handleChange}
              />

            {/* Shipping */}
            <Shipping isPhysical={product?.is_physical} onChange={handleChange} weight={product?.weight}/>
          </div>
        </div>
      </div>
    </>
  )
}

EditProduct.getInitialProps = ({ query }) => {
  console.log('Edit products: ', query)
  return { query }
}

EditProduct.propTypes = {}

export default EditProduct
