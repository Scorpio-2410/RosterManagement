import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/locations/")({
  component: Location,
});

function Location() {
  return <div>Hello</div>;
}
