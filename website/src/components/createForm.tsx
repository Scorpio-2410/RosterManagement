import { useForm } from "react-hook-form";

interface CreateFormProps {
  rosterId: string;
}

function CreateForm({ rosterId }: CreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userId: "",
      startAt: "",
      endAt: ""
    }
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{`Roster ${rosterId} - Add Shift`}</h1>
        <form
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
          })}
          className="space-y-6"
        >
          <div>
            <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">
              User ID
            </label>
            <input
              id="userId"
              {...register("userId", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-2">User ID is required</p>
            )}
          </div>
          <div>
            <label htmlFor="startAt" className="block text-gray-700 font-medium mb-2">
              Start At
            </label>
            <input
              type="datetime-local"
              id="startAt"
              {...register("startAt", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.startAt && (
              <p className="text-red-500 text-sm mt-2">Start datetime is required</p>
            )}
          </div>
          <div>
            <label htmlFor="endAt" className="block text-gray-700 font-medium mb-2">
              End At
            </label>
            <input
              type="datetime-local"
              id="endAt"
              {...register("endAt", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.endAt && (
              <p className="text-red-500 text-sm mt-2">End datetime is required</p>
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
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
