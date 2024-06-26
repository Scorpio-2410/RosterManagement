import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="flex-1 flex flex-col">
        <MainContent />
      </div>
    </div>
  );
}

const localizer = momentLocalizer(moment);

function MainContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const { data, isLoading, refetch } = useQuery<string[], Error>({
    queryKey: ["fetchRosters"],
    queryFn: fetchRosters,
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      const mappedEvents = [
        {
          id: 1,
          title: "Nabidul Islam",
          start: new Date(2024, 5, 26, 9, 0, 0), // June 26, 2024, 09:00 AM
          end: new Date(2024, 5, 26, 17, 0, 0), // June 26, 2024, 05:00 PM
        },
        {
          id: 2,
          title: "Tahani Reza",
          start: new Date(2024, 5, 26, 10, 0, 0), // June 26, 2024, 10:00 AM
          end: new Date(2024, 5, 26, 18, 0, 0), // June 26, 2024, 06:00 PM
        },
      ];
      setEvents(mappedEvents);
    }
  }, [data]);

  async function fetchRosters() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ["Roster 1", "Roster 2", "Roster 3"];
  }

  return (
    <div className="flex-1 p-4">
      <Widget title="Roster Calendar" color="bg-white text-blue-500">
        <div style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            showMultiDayTimes={true}
            dayLayoutAlgorithm="no-overlap"
          />
        </div>
        {isLoading && <p>Loading...</p>}
        <button
          onClick={() => refetch()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Refresh
        </button>
      </Widget>
    </div>
  );
}

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  color: string;
}

function Widget({ title, children, color }: WidgetProps) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
