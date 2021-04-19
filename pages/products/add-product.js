import { Header } from 'components/header';
import { ProductStatus, Title } from 'components/products/addProduct';

function AddProduct(props) {
  return (
    <>
      <Header title="Add Product" />
      <h3>Add Product</h3>

      <div className="flex w-full mt-4 space-x-8">
        <div className="w-7/12 space-y-4">
          {/* Title */}
          <Title />

          {/* Media */}


          {/* Product Variants */}

        </div>
        <div className="w-5/12 space-y-4">
          {/* Product Status */}
          <ProductStatus />


          {/* Product Type */}


          {/* Inventory */}

          {/* Price */}

          {/* Shipping */}

        </div>
      </div>
    </>
  );
}

AddProduct.propTypes = {};

export default AddProduct;
