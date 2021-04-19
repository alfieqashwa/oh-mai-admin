import { GlassDefault } from 'components/glassDefault';
import { Header } from 'components/header';
import { ConfirmationSavedButton, Title, Media, ProductStatus, ProductVariants, ProductType, Inventory, Price, Shipping } from 'components/products/addProduct';

function AddProduct(props) {
  return (
    <>
      <Header title="Add Product" />

      {/* Discard Save Button Confirmation (??) on top of the page */}
      <ConfirmationSavedButton />

      <div className="mx-6 mt-[110px]">

        {/* Page Name */}
        <h3>Add Product</h3>

        <div className="flex mt-4 space-x-6">

          {/* Left Main Page */}
          <div className="w-7/12 space-y-5">

            {/* Title */}
            <Title />

            {/* Media */}
            <Media />

            {/* Product Variants */}
            <ProductVariants />

          </div>

          {/* Right Main Page */}
          <div className="w-6/12 pr-4 space-y-5">

            {/* Product Status */}
            <ProductStatus />


            {/* Product Type */}
            <ProductType />


            {/* Inventory */}
            <Inventory />

            {/* Price */}
            <Price />

            {/* Shipping */}
            <Shipping />
          </div>
        </div>
      </div>
    </>
  );
}

AddProduct.propTypes = {};

export default AddProduct;
