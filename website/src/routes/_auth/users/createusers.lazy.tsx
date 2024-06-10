import CreateUserForm from "@/components/createuserform";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/users/createusers")({
  component: CreateUser,
});

function CreateUser() {
  return <CreateUserForm />;
}
