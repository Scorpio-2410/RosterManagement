import {
  Link,
  createLazyFileRoute,
  useLoaderData,
} from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/_auth/rosters/")({
  component: Rosters,
});

function Rosters() {
  const context = useLoaderData({ from: "/_auth/rosters/" });
  const [searchDate, setSearchDate] = useState("");
  const [filteredRosters, setFilteredRosters] = useState(context.result);

  const handleSearch = () => {
    if (searchDate) {
      const filtered = context.result.filter(
        (i) =>
          new Date(i.startingWeek).toLocaleDateString() ===
          new Date(searchDate).toLocaleDateString()
      );
      setFilteredRosters(filtered);
    } else {
      setFilteredRosters(context.result);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400 font-inter">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Rosters</h1>
          <div className="flex justify-center mb-6">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Search
            </button>
          </div>
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 font-semibold text-gray-700 text-center">
                  Roster ID
                </th>
                <th className="py-3 px-6 bg-gray-200 font-semibold text-gray-700 text-center">
                  Date
                </th>
                <th className="py-3 px-6 bg-gray-200 font-semibold text-gray-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRosters.map((i) => (
                <tr key={i.rosterId} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center">{i.rosterId}</td>
                  <td className="py-3 px-6 text-center">
                    {new Date(i.startingWeek).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to="/rosters/$id"
                      params={{ id: String(i.rosterId) }}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
