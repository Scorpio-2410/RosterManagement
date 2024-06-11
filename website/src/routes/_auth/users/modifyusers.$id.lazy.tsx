import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/users/modifyusers/$id")({
  component: ModifyUser,
});

function ModifyUser() {
  const { id } = Route.useParams();
  return <div>Hello, user {id}</div>;
}

export default ModifyUser;
