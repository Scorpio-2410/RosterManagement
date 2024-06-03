import { useForm } from "react-hook-form";

function CreateLocationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Location</h1>
        <form
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
          })}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="address1"
              className="block text-gray-700 font-medium mb-2"
            >
              Address 1
            </label>
            <input
              id="address1"
              {...register("address1", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm mt-2">Address 1 is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="address2"
              className="block text-gray-700 font-medium mb-2"
            >
              Address 2
            </label>
            <input
              id="address2"
              {...register("address2")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-gray-700 font-medium mb-2"
            >
              City
            </label>
            <input
              id="city"
              {...register("city", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-2">City is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-gray-700 font-medium mb-2"
            >
              State
            </label>
            <input
              id="state"
              {...register("state", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-2">State is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-gray-700 font-medium mb-2"
            >
              Country
            </label>
            <input
              id="country"
              {...register("country", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-2">Country is required</p>
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

export default CreateLocationForm;
