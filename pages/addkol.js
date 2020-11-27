import KolEditor from "components/koleditor";

import useUser from "lib/useUser";

export default function AddKOL() {
  const person = useUser({ redirectTo: "/login" });

  if (person) {
    return (
      <>
        <KolEditor slug={""} />
      </>
    );
  }

  return <></>;
}
