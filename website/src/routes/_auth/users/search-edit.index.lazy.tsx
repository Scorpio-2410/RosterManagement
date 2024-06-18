import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AppSettings } from "@/utils/configs";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/users/search-edit/")({
  component: SearchUser,
});

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
  availability: string | null;
};

type SearchResponse<T> = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  result: T[];
};

export default function SearchUser() {
  const [searchParams, setSearchParams] = useState({
    lastName: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [queryKey, setQueryKey] = useState([
    "users",
    searchParams,
    currentPage,
  ]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setQueryKey(["users", searchParams, currentPage]);
  }, [searchParams, currentPage]);

  const { data, isLoading, refetch } = useQuery<SearchResponse<User>>({
    queryKey,
    queryFn: async () => {
      const requestBody = {
        pageNumber: currentPage,
        pageSize: 5,
        lastName: searchParams.lastName || null,
      };

      const res = await fetch(`${AppSettings.baseUrl}/users/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await res.json();

      return responseData;
    },
    enabled: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: number) => {
      await fetch(`${AppSettings.baseUrl}/users/${userId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    refetch({ throwOnError: false, cancelRefetch: false });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch({ throwOnError: false, cancelRefetch: false });
  };

  const handleDelete = (userId: number) => {
    deleteMutation.mutate(userId);
  };

  const handleModify = (userId: number) => {
    navigate({ to: `/_auth/users/search-edit/${userId}` });
  };

  const totalPages = data ? Math.ceil(data.totalRecords / 5) : 1;

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded">
        <form
          className="flex mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="mr-4 flex-grow">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={searchParams.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="flex justify-center items-center mt-4">
            Data is Loading.....
          </div>
        ) : (
          <>
            {data && data.result.length > 0 ? (
              <>
                <table className="min-w-full table-auto mb-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">First Name</th>
                      <th className="px-4 py-2">Last Name</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Availability</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.result.map((user: User) => (
                      <tr key={user.userId}>
                        <td className="border px-4 py-2">{user.userId}</td>
                        <td className="border px-4 py-2">{user.firstName}</td>
                        <td className="border px-4 py-2">{user.lastName}</td>
                        <td className="border px-4 py-2">{user.role}</td>
                        <td className="border px-4 py-2">
                          {user.availability || "N/A"}
                        </td>
                        <td className="border px-4 py-2 flex space-x-2">
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleModify(user.userId)}
                          >
                            Modify
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleDelete(user.userId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`mx-1 px-3 py-1 border rounded ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-blue-500"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-700">No users found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
