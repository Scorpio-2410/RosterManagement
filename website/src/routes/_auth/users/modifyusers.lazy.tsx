import { AppSettings } from "@/utils/configs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createLazyFileRoute("/_auth/users/modifyusers")({
  component: ModifyUser,
});

type User = {
  userId?: number;
  firstName: string;
  lastName: string;
  role: string;
  availability?: string;
};

type PatchOperation = {
  op: "replace";
  path: string;
  value: string;
};

function ModifyUser() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { register, handleSubmit, setValue, reset } = useForm<Partial<User>>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${AppSettings.baseUrl}/users/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageNumber: 1,
          pageSize: 100,
        }),
      });
      return await res.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (patch: PatchOperation[]) => {
      const res = await fetch(
        `${AppSettings.baseUrl}/users/${selectedUserId}`,
        {
          method: "PATCH",
          body: JSON.stringify(patch),
          headers: { "Content-type": "application/json" },
        }
      );
      return await res.json();
    },
    onSuccess: () => {
      refetch();
      reset();
      setSelectedUserId(null);
      alert("User updated successfully!");
    },
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    const user = data.result.find((u: User) => u.userId === userId);
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("role", user.role);
      setValue("availability", user.availability);
    }
  };

  const onSubmit = (userDetails: Partial<User>) => {
    if (!selectedUserId) return;

    const patch: PatchOperation[] = [];
    if (userDetails.firstName)
      patch.push({
        op: "replace",
        path: "/firstName",
        value: userDetails.firstName,
      });
    if (userDetails.lastName)
      patch.push({
        op: "replace",
        path: "/lastName",
        value: userDetails.lastName,
      });
    if (userDetails.role)
      patch.push({ op: "replace", path: "/role", value: userDetails.role });
    if (userDetails.availability)
      patch.push({
        op: "replace",
        path: "/availability",
        value: userDetails.availability,
      });

    mutate(patch);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Modify User</h1>
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Select a User to Update
          </h2>
          {isLoading ? (
            <div className="text-center">Data is Loading.....</div>
          ) : (
            data &&
            data.result.length > 0 && (
              <div className="space-y-2">
                {data.result.map((user: User) => (
                  <div
                    key={user.userId}
                    onClick={() => handleSelectUser(user.userId!)}
                    className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  >
                    <h3>
                      ID: {user.userId} - Name: {user.firstName} {user.lastName}
                    </h3>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        {selectedUserId && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName", { required: "First name required" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName", { required: "Last name required" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 font-medium mb-2"
              >
                Role
              </label>
              <input
                id="role"
                {...register("role", { required: "Role required" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="availability"
                className="block text-gray-700 font-medium mb-2"
              >
                Availability
              </label>
              <input
                id="availability"
                {...register("availability")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-between items-center">
              <input
                type="submit"
                value="Update User"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
              />
              <input
                type="reset"
                value="Reset"
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300"
                onClick={() => {
                  reset();
                  setSelectedUserId(null);
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
