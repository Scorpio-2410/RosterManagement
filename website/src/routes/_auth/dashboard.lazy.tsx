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
      const mappedEvents = data.map((roster, index) => ({
        id: index,
        title: roster,
        start: new Date(2023, index % 12, 1), // Sample start date
        end: new Date(2023, index % 12, 2),   // Sample end date
        allDay: true,
      }));
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
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
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
