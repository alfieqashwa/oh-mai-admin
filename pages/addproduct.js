import React, { PureComponent } from "react";

import ProductEditor from "components/producteditor";
import PuffLoader from "react-spinners/PuffLoader";
import useUser from "lib/useUser";

export default function AddProduct() {
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
      <ProductEditor slug={""} />
    </>
  );
}
