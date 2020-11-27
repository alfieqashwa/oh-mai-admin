import ProductEditor from "components/producteditor";

import useUser from "lib/useUser";

export default function AddProduct() {
  const person = useUser({ redirectTo: "/login" });

  if (person) {
    return (
      <>
        <ProductEditor slug={""} />
      </>
    );
  }

  return <></>;
}
