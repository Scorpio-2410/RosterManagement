import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { AppSettings } from "@/utils/configs";

export const Route = createLazyFileRoute("/_auth/locations/create")({
  component: CreateLocation,
});

type Locations = {
  Address1: string;
  Address2?: string;
  City: string;
  State: string;
  Country: string;
};

function CreateLocation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Locations>();

  const { mutate } = useMutation({
    mutationFn: async (locations: Locations) => {
      const res = await fetch(`${AppSettings.baseUrl}/locations`, {
        method: "POST",
        body: JSON.stringify(locations),
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    },
    onSuccess: () => {
      reset();
      alert("Location created successfully!");
    },
  });

  const handleSubmitHandler = (data: Locations) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create New Location
        </h1>
        <form
          onSubmit={handleSubmit(handleSubmitHandler)}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="Address1"
              className="block text-gray-700 font-medium mb-2"
            >
              Address 1
            </label>
            <input
              id="Address1"
              {...register("Address1", { required: "Address 1 is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.Address1 && (
              <p className="text-red-500 text-sm mt-2">
                {errors.Address1.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Address2"
              className="block text-gray-700 font-medium mb-2"
            >
              Address 2
            </label>
            <input
              id="Address2"
              {...register("Address2")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="City"
              className="block text-gray-700 font-medium mb-2"
            >
              City
            </label>
            <input
              id="City"
              {...register("City", { required: "City is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.City && (
              <p className="text-red-500 text-sm mt-2">{errors.City.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="State"
              className="block text-gray-700 font-medium mb-2"
            >
              State
            </label>
            <input
              id="State"
              {...register("State", { required: "State is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.State && (
              <p className="text-red-500 text-sm mt-2">
                {errors.State.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Country"
              className="block text-gray-700 font-medium mb-2"
            >
              Country
            </label>
            <input
              id="Country"
              {...register("Country", { required: "Country is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.Country && (
              <p className="text-red-500 text-sm mt-2">
                {errors.Country.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <input
              type="submit"
              value="Submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            />
            <input
              type="reset"
              value="Reset"
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300"
              onClick={() => reset()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
