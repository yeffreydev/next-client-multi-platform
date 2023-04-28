import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Paint from "./Paint";

export default async function EditPage({ params }: { params: Params }) {
  return (
    <div>
      <Paint paintId={params.id} />
    </div>
  );
}
