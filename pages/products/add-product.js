import { GlassDefault } from 'components/glassDefault';
import { Header } from 'components/header';
import { ConfirmationSavedButton, Title, Media, ProductStatus, ProductVariants, ProductType, Inventory, Price, Shipping } from 'components/products/addProduct';

function AddProduct(props) {
  return (
    <>
      <Header title="Add Product" />

      {/* Discard Save Button Confirmation (??) on top of the page */}
      <ConfirmationSavedButton />

      <div className="mx-4 mt-16 md:mt-24">

        {/* Page Name */}
        <h3 className="hidden md:block">Add Product</h3>

        <div className="flex items-center justify-between md:hidden">
          <h3>Add Product</h3>
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
            <Title />

            {/* Media */}
            <Media />

            {/* Product Variants */}
            <ProductVariants />

          </div>

          {/* Right Main Page */}
          <div className="space-y-5 md:pr-4 md:w-5/12">

            {/* Product Status */}
            <div className="hidden md:block">
              <ProductStatus />
            </div>

            {/* Product Type */}
            <div className="hidden md:block">
              <ProductType>
                <p className="hidden mt-2 md:block w350">This product is available on OhMai and KOL stores.</p>
              </ProductType>
            </div>

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
