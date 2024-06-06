import { useQuery, useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AppSettings } from "@/utils/configs";
import { useState } from "react";
import CreateUserForm from "@/components/createuserform";

export const Route = createLazyFileRoute("/_auth/users")({
  component: Users,
});

type User = {
  userId?: number;
  firstName: string;
  lastName: string;
  role: string;
  availability?: string;
};

function Users() {
  const [searchParams] = useState({
    pageNumber: 1,
    pageSize: 100,
  });
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${AppSettings.baseUrl}/users/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchParams }),
      });
      return await res.json();
    },
    enabled: false,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (user: User) => {
      const res = await fetch(`${AppSettings.baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    },
    onSuccess: refetch,
  });

  if (error || isError) return <div>There was an error!</div>;

  if (isLoading) return <div>Data is Loading.....</div>;

  console.log(data);

  const handleSubmit = () => {
    mutate({
      firstName: "Nabidul",
      lastName: "Islam",
      role: "Student",
    });
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="User">
      <CreateUserForm />
      {/* Ispending is true and this will be shown */}
      {isPending && <p>Data is being added...</p>}
      <button onClick={handleSubmit}>Add Post</button>
      <button onClick={handleSearch}>Search</button>
      {data &&
        data.result.map((user: User) => (
          <div>
            {" "}
            <h1>ID: {user.userId}</h1>
            <h1>Name: {user.firstName}</h1>
          </div>
        ))}
    </div>
  );
}
