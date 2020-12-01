import KolEditor from "components/koleditor";
import { useRouter } from "next/router";
import useUser from "lib/useUser";

export default function EditKOL() {
  const router = useRouter();
  const person = useUser({ redirectTo: "/login" });

  if (person) {
    return (
      <>
        <KolEditor slug={router.query.slug} />
      </>
    );
  }

  return <></>;
}
