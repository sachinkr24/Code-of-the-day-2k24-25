import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Points = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Points";
    const fetchData = async () => {
      try {
        const res = await axios.get('https://code-of-the-day-2k24-25-backend.onrender.com/api/points');
        setData(res.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8 text-xl">Loading...</div>;

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 flex justify-center">
      <div className="w-full max-w-sm border rounded-lg shadow-lg p-4 bg-white">
        <h1 className="text-xl font-semibold mb-4 text-center">Team Points</h1>
        <div className="overflow-hidden border rounded-lg">
          <table className="min-w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-indigo-600">
                <th className="px-3 py-2 text-white font-medium text-center border border-gray-200">
                  Day
                </th>
                <th className="px-3 py-2 text-white font-medium text-center border border-gray-200">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((point, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} transition-colors duration-150`}
                >
                  <td className="px-3 py-2 text-center border border-gray-200 text-sm">
                    {point.day}
                  </td>
                  <td className="px-3 py-2 text-center border border-gray-200 text-sm">
                    {point.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Points;
