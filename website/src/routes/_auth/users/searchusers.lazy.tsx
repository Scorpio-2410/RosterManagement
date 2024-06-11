import SearchUserForm from "@/components/searchuserform";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/users/searchusers")({
  component: SearchUser,
});

function SearchUser() {
  return <SearchUserForm />;
}
