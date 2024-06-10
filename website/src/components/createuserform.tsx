import { AppSettings } from "@/utils/configs";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { useState } from "react";

type AvailabilityOption = {
  value: string;
  label: string;
};

const availabilityOptions: AvailabilityOption[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

type User = {
  firstName: string;
  lastName: string;
  role: string;
  availability?: string;
};

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<User>();

  const [selectedAvailability, setSelectedAvailability] = useState<
    AvailabilityOption[]
  >([]);

  const { mutate } = useMutation({
    mutationFn: async (user: User) => {
      const res = await fetch(`${AppSettings.baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    },
    onSuccess: () => {
      reset();
      setSelectedAvailability([]);
      alert("User created successfully!");
    },
  });

  const handleAvailabilityChange = (
    selectedOptions: MultiValue<AvailabilityOption>
  ) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedAvailability(selectedOptions as AvailabilityOption[]);
    setValue("availability", values.join(", "));
  };

  const handleSubmitHandler = (data: User) => {
    if (!data.availability || data.availability.trim() === "") {
      delete data.availability;
    }
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New User</h1>
        <form
          onSubmit={handleSubmit(handleSubmitHandler)}
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
              {...register("firstName", { required: "First name required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName.message}
              </p>
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
              {...register("lastName", { required: "Last name required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName.message}
              </p>
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
              {...register("role", { required: "Role required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="availability"
              className="block text-gray-700 font-medium mb-2"
            >
              Availability
            </label>
            <Select
              options={availabilityOptions}
              onChange={handleAvailabilityChange}
              className="w-full"
              placeholder="Select availability"
              isClearable
              isMulti
              value={selectedAvailability}
            />
            <input type="hidden" {...register("availability")} />
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
              onClick={() => {
                reset();
                setSelectedAvailability([]);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
