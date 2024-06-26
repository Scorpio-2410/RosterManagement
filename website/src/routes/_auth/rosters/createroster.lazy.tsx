import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AppSettings } from "@/utils/configs";

export const Route = createLazyFileRoute("/_auth/rosters/createroster")({
  component: CreateRoster,
});

type CreateRosterForm = {
  LocationId: number;
  StartingWeek: string;
};

function CreateRoster() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRosterForm>();

  const { mutate } = useMutation({
    mutationFn: async (data: CreateRosterForm) => {
      const res = await fetch(`${AppSettings.baseUrl}/rosters`, {
        method: "POST",
        body: JSON.stringify({
          LocationId: data.LocationId,
          StartingWeek: new Date(data.StartingWeek),
        }),
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    },
    onSuccess: () => {
      reset();
      alert("Roster created successfully!");
    },
  });

  const onSubmit = (data: CreateRosterForm) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create New Roster
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="LocationId"
              className="block text-gray-700 font-medium mb-2"
            >
              Location ID
            </label>
            <input
              id="LocationId"
              type="number"
              {...register("LocationId", {
                required: "Location ID is required",
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.LocationId && (
              <p className="text-red-500 text-sm mt-2">
                {errors.LocationId.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="StartingWeek"
              className="block text-gray-700 font-medium mb-2"
            >
              Starting Week
            </label>
            <input
              id="StartingWeek"
              type="date"
              {...register("StartingWeek", {
                required: "Starting Week is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.StartingWeek && (
              <p className="text-red-500 text-sm mt-2">
                {errors.StartingWeek.message}
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
