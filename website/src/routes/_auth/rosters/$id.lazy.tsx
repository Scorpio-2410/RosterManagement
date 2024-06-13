import CreateForm from "@/components/createshiftform";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/rosters/$id")({
  component: Roster,
});

function Roster() {
  const { id } = Route.useParams();
  return (
    <div>
      <CreateForm rosterId={id} />
    </div>
  );
}
