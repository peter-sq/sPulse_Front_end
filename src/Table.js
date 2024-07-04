import React from 'react';

const Table = () => {
  const data = [
    // Example data structure based on the screenshot
    {
      date: '11 - May - 2024',
      matches: [
        { teams: 'Nottingham - Chelsea', bet: '2 DNB', odds: '1.50' },
        { teams: 'Mainz - Dortmund', bet: 'Over 2.5', odds: '1.44' },
        { teams: 'AC Milan - Cagliari', bet: 'Over 2.5', odds: '1.57' },
        { teams: 'Celtic - Rangers', bet: 'Over 2.5', odds: '1.50' },
      ],
    },
    // Add more data entries as needed
  ];

  return (
    <div className="container mx-auto py-4">
      {data.map((day, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{day.date}</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Match</th>
                <th className="py-2 px-4 border-b">Bet</th>
                <th className="py-2 px-4 border-b">Odds</th>
              </tr>
            </thead>
            <tbody>
              {day.matches.map((match, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{match.teams}</td>
                  <td className="py-2 px-4 border-b">{match.bet}</td>
                  <td className="py-2 px-4 border-b">{match.odds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Table;