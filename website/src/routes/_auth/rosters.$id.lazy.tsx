import { createLazyFileRoute } from '@tanstack/react-router';
import { useForm, FieldApi } from '@tanstack/react-form';

export const Route = createLazyFileRoute('/_auth/rosters/$id')({
  component: Roster,
});

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <div className="text-red-500 mt-1 text-sm">
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  );
}

function Roster() {
  const form = useForm({
    defaultValues: {
      rosterId: '',
      userId: '',
      startAt: '',
      endAt: '',
    },
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form Data:', value);
      // Assume the shiftId is returned from the API
      const shiftId = Math.floor(Math.random() * 1000);
      console.log('Shift ID:', shiftId);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Roster Shift</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div>
            <form.Field
              name="rosterId"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Roster ID is required' : undefined,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    Roster ID:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="userId"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'User ID is required' : undefined,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    User ID:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="startAt"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Start datetime is required' : undefined,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    Start At:
                  </label>
                  <input
                    type="datetime-local"
                    id={field.name}
                    name={field.name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="endAt"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'End datetime is required' : undefined,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    End At:
                  </label>
                  <input
                    type="datetime-local"
                    id={field.name}
                    name={field.name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`border-2 border-blue-400 bg-blue-400 text-white w-full py-2 rounded-md hover:bg-transparent hover:text-blue-400 font-semibold transition-colors duration-300`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="reset"
                  onClick={() => form.reset()}
                  className="ml-4 border-2 border-gray-300 text-gray-700 w-full py-2 rounded-md hover:bg-gray-200 font-semibold transition-colors duration-300"
                >
                  Reset
                </button>
              </div>
            )}
          />
        </form>
      </div>
    </div>
  );
}