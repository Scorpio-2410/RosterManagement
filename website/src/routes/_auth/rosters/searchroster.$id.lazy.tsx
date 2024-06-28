import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppSettings } from "@/utils/configs";
import { useForm } from "react-hook-form";

export const Route = createLazyFileRoute("/_auth/rosters/searchroster/$id")({
  component: RosterCalendar,
});

type Shift = {
  shiftId: number;
  userId: number;
  startAt: string;
  endAt: string;
};

type CreateShiftForm = {
  userId: number;
  startTime: string;
  endTime: string;
};

type ShiftData = {
  userId: number;
  startAt: string;
  endAt: string;
};

const localizer = momentLocalizer(moment);

function RosterCalendar() {
  const { id } = Route.useParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateShiftForm>();

  const { data: shifts } = useQuery<Event[], Error>({
    queryKey: ["fetchShifts", id],
    queryFn: async () => {
      const response = await fetch(
        `${AppSettings.baseUrl}/rosters/${id}/shifts`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shifts");
      }
      const data: Shift[] = await response.json();
      return data.map((shift: Shift) => ({
        id: shift.shiftId,
        title: `User ${shift.userId}`,
        start: new Date(shift.startAt),
        end: new Date(shift.endAt),
      }));
    },
  });

  const mutation = useMutation<Shift, Error, ShiftData>({
    mutationFn: async (data: ShiftData) => {
      const response = await fetch(
        `${AppSettings.baseUrl}/rosters/${id}/shifts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create shift");
      }

      return response.json();
    },
    onSuccess: () => {
      reset();
      setSelectedDate(null);
    },
  });

  const onSubmit = (data: CreateShiftForm) => {
    if (!selectedDate) return;

    const startDateTime = new Date(selectedDate);
    const [startHour, startMinute] = data.startTime.split(":");
    startDateTime.setHours(parseInt(startHour), parseInt(startMinute));

    const endDateTime = new Date(selectedDate);
    const [endHour, endMinute] = data.endTime.split(":");
    endDateTime.setHours(parseInt(endHour), parseInt(endMinute));

    if (startDateTime >= endDateTime) {
      alert("End time must be after start time");
      return;
    }

    const shiftData = {
      userId: data.userId,
      startAt: startDateTime.toISOString(),
      endAt: endDateTime.toISOString(),
    };

    mutation.mutate(shiftData);
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    setSelectedDate(slotInfo.start);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Roster {id} - Calendar
        </h1>
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={shifts || []}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            style={{ height: 500 }}
            showMultiDayTimes={true}
            dayLayoutAlgorithm="no-overlap"
          />
        </div>
      </div>
      {selectedDate && (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Shift on {moment(selectedDate).format("MMMM Do YYYY")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="userId"
                className="block text-gray-700 font-medium mb-2"
              >
                User ID
              </label>
              <input
                id="userId"
                type="number"
                {...register("userId", {
                  required: "User ID is required",
                  min: 1,
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.userId && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.userId.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="startTime"
                className="block text-gray-700 font-medium mb-2"
              >
                Start Time
              </label>
              <input
                id="startTime"
                type="text"
                placeholder="HH:MM"
                {...register("startTime", {
                  required: "Start time is required",
                  pattern: {
                    value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                    message: "Invalid time format (HH:MM)",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-gray-700 font-medium mb-2"
              >
                End Time
              </label>
              <input
                id="endTime"
                type="text"
                placeholder="HH:MM"
                {...register("endTime", {
                  required: "End time is required",
                  pattern: {
                    value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                    message: "Invalid time format (HH:MM)",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.endTime.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center">
              <input
                type="submit"
                value="Create Shift"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
              />
              <input
                type="button"
                value="Cancel"
                onClick={() => setSelectedDate(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
