import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

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

function MainContent() {
  const [rosters, setRosters] = useState<string[]>([]);
  const { data, isLoading, refetch } = useQuery<string[], Error>({
    queryKey: ["fetchRosters"],
    queryFn: fetchRosters,
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setRosters(data);
    }
  }, [data]);

  async function fetchRosters() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ["Roster 1", "Roster 2", "Roster 3"];
  }

  return (
    <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <Widget title="User Requests" color="bg-white text-teal-500">
        <p className="text-teal-500">List of user requests...</p>
      </Widget>
      <Widget title="Leaves" color="bg-white text-blue-500">
        <p className="text-blue-500">List of leaves...</p>
      </Widget>
      <Widget title="Important Announcements" color="bg-white text-teal-500">
        <p className="text-teal-500">List of important announcements...</p>
      </Widget>
      <Widget title="Roster Overview" color="bg-white text-blue-500">
        <p className="text-blue-500">List of rosters...</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {rosters.map((roster, index) => (
              <li key={index}>{roster}</li>
            ))}
          </ul>
        )}
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
