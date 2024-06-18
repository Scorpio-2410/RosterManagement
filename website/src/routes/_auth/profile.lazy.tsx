import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/profile")({
  component: Profile,
});

function Profile() {
  return <div>Hello</div>;
}
