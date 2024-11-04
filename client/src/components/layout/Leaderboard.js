import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamFilter, setTeamFilter] = useState('');

  useEffect(() => {
    document.title = "Leaderboard";
    const fetchData = async () => {
      try {
        // Inform the user that data may take a moment to load
        console.log("Fetching leaderboard data. Please wait a few seconds...");
        
        const res = await axios.get('https://code-of-the-day-2k24-25-backend.onrender.com/api/points/leaderboard');
        setData(res.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter data in a case-insensitive way
  const filteredData = teamFilter
    ? data.filter((point) => point.teamName && point.teamName.toLowerCase().includes(teamFilter.toLowerCase()))
    : data;

  if (loading) return <div className="text-center py-8 text-xl">Loading... It may take a moment to load; please wait a few seconds.</div>;

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 flex justify-center">
      <div className="w-full max-w-lg border rounded-lg shadow-lg p-4 bg-white">
        <h1 className="text-xl font-semibold mb-6 text-center">Leaderboard</h1>

        <input
          type="text"
          placeholder="Filter by team name..."
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="p-2 mb-4 border rounded w-full"
        />

        <div className="overflow-hidden border rounded-lg">
          {filteredData.length > 0 ? (
            <table className="min-w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-indigo-600">
                  <th className="px-3 py-2 text-white font-medium text-center border border-gray-200">
                    Rank
                  </th>
                  <th className="px-3 py-2 text-white font-medium text-center border border-gray-200">
                    Team
                  </th>
                  <th className="px-3 py-2 text-white font-medium text-center border border-gray-200">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((point, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} transition-colors duration-150`}
                  >
                    <td className="px-3 py-2 text-center border border-gray-200 text-sm">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 text-center border border-gray-200 text-sm">
                      {point.teamName}
                    </td>
                    <td className="px-3 py-2 text-center border border-gray-200 text-sm">
                      {point.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
