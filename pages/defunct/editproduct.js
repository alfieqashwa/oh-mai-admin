import React, { PureComponent } from "react";
import ProductEditor from "components/producteditor";
import { useRouter } from "next/router";
import useUser from "lib/useUser";
import PuffLoader from "react-spinners/PuffLoader";

export default function EditProduct() {
  const router = useRouter();
  const { loggedOut, user } = useUser();

  React.useEffect(() => {
    if (loggedOut) {
      router.replace("/login");
      return <PuffLoader color={"#8A3EFF"} size={150} />;
    }
  }, [loggedOut]);

  if (!user)
    return (
      <div className="w-full flex items-center justify-center">
        <PuffLoader color={"#8A3EFF"} size={150} />
      </div>
    );

  return (
    <>
      <ProductEditor slug={router.query.slug} />
    </>
  );
}
