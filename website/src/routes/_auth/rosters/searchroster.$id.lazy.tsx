import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AppSettings } from "@/utils/configs";

export const Route = createLazyFileRoute('/_auth/rosters/searchroster/$id')({
  component: CreateShift,
});

type CreateShiftForm = {
  userId: number;
  startAt: string;
  endAt: string;
};

function CreateShift() {
  const { id } = Route.useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateShiftForm>();

  const mutation = useMutation<CreateShiftForm, Error, CreateShiftForm>({
    mutationFn: async (data: CreateShiftForm) => {
      const response = await fetch(`${AppSettings.baseUrl}/rosters/${id}/shifts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create shift');
      }

      return response.json();
    },
    onError: (error: any) => {
      alert(`Error: ${error.message}`);
    },
    onSuccess: () => {
      alert("Shift created successfully!");
      reset();
    },
  });

  const onSubmit = (data: CreateShiftForm) => {
    const startDate = new Date(data.startAt);
    const endDate = new Date(data.endAt);
    if (startDate.getDate() !== endDate.getDate()) {
      alert("Start and End Date of shift do not match!");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Roster {id} - Create Shift</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">User ID</label>
            <input
              id="userId"
              type="number"
              {...register("userId", { required: "User ID is required", min: 1 })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.userId && <p className="text-red-500 text-sm mt-2">{errors.userId.message}</p>}
          </div>
          <div>
            <label htmlFor="startAt" className="block text-gray-700 font-medium mb-2">Start At</label>
            <input
              id="startAt"
              type="datetime-local"
              {...register("startAt", { required: "Start time is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.startAt && <p className="text-red-500 text-sm mt-2">{errors.startAt.message}</p>}
          </div>
          <div>
            <label htmlFor="endAt" className="block text-gray-700 font-medium mb-2">End At</label>
            <input
              id="endAt"
              type="datetime-local"
              {...register("endAt", { required: "End time is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.endAt && <p className="text-red-500 text-sm mt-2">{errors.endAt.message}</p>}
          </div>
          <div className="flex justify-between items-center">
            <input
              type="submit"
              value="Create Shift"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            />
            <input
              type="button"
              value="Reset"
              onClick={() => reset()}
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
