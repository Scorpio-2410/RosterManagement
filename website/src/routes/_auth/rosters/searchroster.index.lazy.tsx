import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AppSettings } from "@/utils/configs";

export const Route = createLazyFileRoute("/_auth/rosters/searchroster/")({
  component: SearchRosters,
});

type SearchRostersForm = {
  startingWeek?: string;
};

type Roster = {
  rosterId: number;
  locationId: number;
  startingWeek: string;
};

type SearchResponse<T> = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  result: T[];
};

type SearchParams = {
  pageSize: number;
  pageNumber: number;
  startingWeek?: Date;
};

function SearchRosters() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchRostersForm>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    pageSize: 10,
    pageNumber: 1,
  });

  const { data, isLoading, refetch } = useQuery<SearchResponse<Roster>>({
    queryKey: ["searchRosters", searchParams],
    queryFn: async () => {
      const body: SearchParams = {
        pageSize: searchParams.pageSize,
        pageNumber: searchParams.pageNumber,
      };

      if (searchParams.startingWeek) {
        body.startingWeek = searchParams.startingWeek;
      }

      const response = await fetch(`${AppSettings.baseUrl}/rosters/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch rosters");
      }
      return response.json();
    },
    enabled: false,
  });

  const onSubmit = (data: SearchRostersForm) => {
    const params: SearchParams = {
      pageSize: 10,
      pageNumber: 1,
    };

    if (data.startingWeek) {
      params.startingWeek = new Date(data.startingWeek);
    }

    setSearchParams(params);
    refetch();
  };

  const handleViewDetails = (id: number) => {
    navigate({
      to: `/rosters/searchroster/${id}`,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Search Rosters</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-end">
            <div className="flex-grow">
              <label
                htmlFor="startingWeek"
                className="block text-gray-700 font-medium mb-2"
              >
                Starting Week
              </label>
              <input
                id="startingWeek"
                type="date"
                {...register("startingWeek", {
                  validate: (value) =>
                    !value ||
                    new Date(value).getDay() === 1 ||
                    "Starting Week must be a Monday",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.startingWeek && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.startingWeek.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </form>

        {isLoading && <p className="text-center mt-4">Loading...</p>}

        {data && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <table className="min-w-full table-auto mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Location ID</th>
                  <th className="px-4 py-2">Starting Week</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.result.map((roster) => (
                  <tr key={roster.rosterId}>
                    <td className="border px-4 py-2">{roster.rosterId}</td>
                    <td className="border px-4 py-2">{roster.locationId}</td>
                    <td className="border px-4 py-2">
                      {new Date(roster.startingWeek).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      <button
                        onClick={() => handleViewDetails(roster.rosterId)}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
                      >
                        Modify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              {Array.from(
                {
                  length: Math.ceil(data.totalRecords / searchParams.pageSize),
                },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() =>
                      setSearchParams((prev) => ({
                        ...prev,
                        pageNumber: index + 1,
                      }))
                    }
                    className={`mx-1 px-3 py-1 border rounded ${
                      searchParams.pageNumber === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
