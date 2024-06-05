import { useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { useEffect } from "react";

type CreateShiftFormProps = {
  rosterId: string;
};

type UserOption = {
  value: string;
  label: string;
};

const users: UserOption[] = [
  { value: "1", label: "Nabidul Islam" },
  { value: "2", label: "John Cena" },
  { value: "3", label: "Ben Green" },
];

function CreateShiftForm({ rosterId }: CreateShiftFormProps) {
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
      fullName: "",
      startAt: "",
      endAt: "",
    },
  });

  const fullName = watch("fullName");

  const handleUserChange = (selectedOption: SingleValue<UserOption>) => {
    setValue("fullName", selectedOption ? selectedOption.label : "");
    trigger("fullName");
  };

  useEffect(() => {
    if (!fullName) {
      setValue("fullName", "");
    }
  }, [fullName, setValue]);

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
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <Select
              options={users}
              onChange={handleUserChange}
              className="w-full"
              placeholder="Select a user"
              isClearable
              value={users.find((user) => user.label === fullName) || null}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2">Full Name is required</p>
            )}
            <input
              type="hidden"
              {...register("fullName", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="startAt"
              className="block text-gray-700 font-medium mb-2"
            >
              Start At
            </label>
            <input
              type="datetime-local"
              id="startAt"
              {...register("startAt", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.startAt && (
              <p className="text-red-500 text-sm mt-2">
                Start datetime is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="endAt"
              className="block text-gray-700 font-medium mb-2"
            >
              End At
            </label>
            <input
              type="datetime-local"
              id="endAt"
              {...register("endAt", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.endAt && (
              <p className="text-red-500 text-sm mt-2">
                End datetime is required
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

export default CreateShiftForm;
