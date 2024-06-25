import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AppSettings } from "@/utils/configs";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";

export const Route = createLazyFileRoute("/_auth/locations/search-modify")({
  component: SearchModifyLocations,
});

type Locations = {
  locationId: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
};

type SearchResponse<T> = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  result: T[];
};

function SearchModifyLocations() {
  const [searchParams, setSearchParams] = useState({
    State: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [queryKey, setQueryKey] = useState([
    "locations",
    searchParams,
    currentPage,
  ]);
  const [editableLocation, setEditableLocation] =
    useState<Partial<Locations> | null>(null);

  useEffect(() => {
    setQueryKey(["locations", searchParams, currentPage]);
  }, [searchParams, currentPage]);

  const { data, isLoading, refetch } = useQuery<SearchResponse<Locations>>({
    queryKey,
    queryFn: async () => {
      const requestBody = {
        pageNumber: currentPage,
        pageSize: 5,
        state: searchParams.State || null,
      };

      const res = await fetch(`${AppSettings.baseUrl}/locations/search`, {
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

  const updateLocation = useMutation({
    mutationFn: async (location: Partial<Locations>) => {
      const patchDoc = [];
      if (location.address1) {
        patchDoc.push({
          op: "replace",
          path: "/address1",
          value: location.address1,
        });
      }
      if (location.address2) {
        patchDoc.push({
          op: "replace",
          path: "/address2",
          value: location.address2,
        });
      }
      if (location.city) {
        patchDoc.push({
          op: "replace",
          path: "/city",
          value: location.city,
        });
      }
      if (location.state) {
        patchDoc.push({
          op: "replace",
          path: "/state",
          value: location.state,
        });
      }
      if (location.country) {
        patchDoc.push({
          op: "replace",
          path: "/country",
          value: location.country,
        });
      }

      const res = await fetch(
        `${AppSettings.baseUrl}/locations/${location.locationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json-patch+json",
          },
          body: JSON.stringify(patchDoc),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update location");
      }
    },
    onSuccess: () => {
      setEditableLocation(null);
      refetch();
    },
  });

  const { control, handleSubmit, setValue } = useForm<Locations>({
    defaultValues: {
      locationId: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
    },
  });

  useEffect(() => {
    if (editableLocation) {
      setValue("address1", editableLocation.address1 || "");
      setValue("address2", editableLocation.address2 || "");
      setValue("city", editableLocation.city || "");
      setValue("state", editableLocation.state || "");
      setValue("country", editableLocation.country || "");
    }
  }, [editableLocation, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch({ throwOnError: false, cancelRefetch: false });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch({ throwOnError: false, cancelRefetch: false });
  };

  const handleEdit = (location: Locations) => {
    setEditableLocation(location);
  };

  const onSubmit = (data: Locations) => {
    if (editableLocation) {
      updateLocation.mutate({
        ...editableLocation,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        country: data.country,
      });
    }
  };

  const totalPages = data ? Math.ceil(data.totalRecords / 5) : 1;

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded">
        <form className="flex mb-4" onSubmit={handleSearch}>
          <div className="mr-4 flex-grow">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="State"
            >
              State
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="State"
              placeholder="State"
              value={searchParams.State}
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
                      <th className="px-4 py-2">Address 1</th>
                      <th className="px-4 py-2">Address 2</th>
                      <th className="px-4 py-2">City</th>
                      <th className="px-4 py-2">State</th>
                      <th className="px-4 py-2">Country</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.result.map((location: Locations) => (
                      <tr key={location.locationId}>
                        <td className="border px-4 py-2">
                          {location.locationId}
                        </td>
                        <td className="border px-4 py-2">
                          {editableLocation?.locationId ===
                          location.locationId ? (
                            <Controller
                              name="address1"
                              control={control}
                              render={({ field }) => (
                                <input {...field} className="w-full" />
                              )}
                            />
                          ) : (
                            location.address1
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editableLocation?.locationId ===
                          location.locationId ? (
                            <Controller
                              name="address2"
                              control={control}
                              render={({ field }) => (
                                <input {...field} className="w-full" />
                              )}
                            />
                          ) : (
                            location.address2 || "N/A"
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editableLocation?.locationId ===
                          location.locationId ? (
                            <Controller
                              name="city"
                              control={control}
                              render={({ field }) => (
                                <input {...field} className="w-full" />
                              )}
                            />
                          ) : (
                            location.city
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editableLocation?.locationId ===
                          location.locationId ? (
                            <Controller
                              name="state"
                              control={control}
                              render={({ field }) => (
                                <input {...field} className="w-full" />
                              )}
                            />
                          ) : (
                            location.state
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {editableLocation?.locationId ===
                          location.locationId ? (
                            <Controller
                              name="country"
                              control={control}
                              render={({ field }) => (
                                <input {...field} className="w-full" />
                              )}
                            />
                          ) : (
                            location.country
                          )}
                        </td>
                        <td className="border px-4 py-2 flex space-x-2">
                          {editableLocation?.locationId ===
                          location.locationId ? (
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              onClick={handleSubmit(onSubmit)}
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                              onClick={() => handleEdit(location)}
                            >
                              Modify
                            </button>
                          )}
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
              <div className="text-center text-gray-700">
                No locations found
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
