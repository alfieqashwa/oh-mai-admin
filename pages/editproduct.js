import ProductEditor from "components/producteditor";
import { useRouter } from "next/router";

export default function EditProduct() {
  const router = useRouter();

  return (
    <>
      <ProductEditor slug={router.query.slug} />
    </>
  );
}
