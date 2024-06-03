import { useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { useEffect } from "react";

type AvailabilityOption = {
  value: string;
  label: string;
};

const availabilities: AvailabilityOption[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
      availabilities: [] as string[],
    },
  });

  const role = watch("role");
  const userAvailabilities = watch("availabilities");

  const handleAvailabilitiesChange = (selectedOptions: MultiValue<AvailabilityOption>) => {
    setValue(
      "availabilities",
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
    trigger("availabilities");
  };

  useEffect(() => {
    if (!role) {
      setValue("role", "");
    }
    if (!userAvailabilities) {
      setValue("availabilities", []);
    }
  }, [role, userAvailabilities, setValue]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Create User</h1>
        <form
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
          })}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">First Name is required</p>
            )}
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
              {...register("lastName", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">Last Name is required</p>
            )}
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
              {...register("role", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-2">Role is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="availabilities"
              className="block text-gray-700 font-medium mb-2"
            >
              Availabilities
            </label>
            <Select
              options={availabilities}
              onChange={handleAvailabilitiesChange}
              className="w-full"
              placeholder="Select availabilities"
              isClearable
              isMulti
              value={availabilities.filter((availability) =>
                userAvailabilities.includes(availability.value)
              )}
            />
            {errors.availabilities && (
              <p className="text-red-500 text-sm mt-2">Availabilities are required</p>
            )}
            <input
              type="hidden"
              {...register("availabilities")}
            />
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

export default CreateUserForm;
