import CreateForm from "@/components/createshiftform";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/rosters/$id")({
  component: Roster,
});

export default function Roster() {
  const { id } = Route.useParams();
  return (
    <div>
      <CreateForm rosterId={id} />
    </div>
  );
}
