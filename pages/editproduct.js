import ProductEditor from "components/producteditor";
import { useRouter } from "next/router";
import useUser from "lib/useUser";

export default function EditProduct() {
  const router = useRouter();
  const person = useUser({ redirectTo: "/login" });

  if (person) {
    return (
      <>
        <ProductEditor slug={router.query.slug} />
      </>
    );
  }

  return <></>;
}
