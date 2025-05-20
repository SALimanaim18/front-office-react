import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getBloodTypeDistribution } from '../../../services/api/statisticsApi';

const bloodTypeColors = {
  "A+": "#4b80df",
  "O+": "#34a874",
  "B+": "#8765c7",
  "AB+": "#e9b939",
  "A-": "#6296e8",
  "O-": "#47cc94",
  "B-": "#ff9f43",
  "AB-": "#ef5350",
};

// Tooltip personnalisé
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md">
        <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BloodTypeChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const distribution = await getBloodTypeDistribution();
        const formattedData = Object.entries(distribution).map(([name, value]) => ({
          name,
          value,
          color: bloodTypeColors[name] || "#ccc"
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Erreur lors du chargement des données de groupes sanguins :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Répartition des groupes sanguins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodTypeChart;
