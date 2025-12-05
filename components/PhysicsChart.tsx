import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Area,
  AreaChart
} from 'recharts';

interface PhysicsChartProps {
  distance: number;
  time: number;
  currentVelocity: number;
}

export const PhysicsChart: React.FC<PhysicsChartProps> = ({ distance, time, currentVelocity }) => {
  // Generate data points for Velocity vs Time (fixing Distance)
  const chartData = useMemo(() => {
    if (distance <= 0 || time <= 0) return [];

    const points = [];
    const startT = Math.max(0.1, time * 0.2);
    const endT = time * 2.5;
    const steps = 40; // Increased steps for smoother curve
    const stepSize = (endT - startT) / steps;

    for (let i = 0; i <= steps; i++) {
      const t = startT + (i * stepSize);
      const v = distance / t;
      points.push({
        name: t.toFixed(1),
        time: t,
        velocity: parseFloat(v.toFixed(2))
      });
    }
    return points;
  }, [distance, time]);

  if (distance <= 0 || time <= 0) return null;

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="time" 
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            dy={10}
            label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 11 }} 
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{ value: 'Velocidad (m/s)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11, dx: 10 }} 
          />
          <Tooltip 
            cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
              padding: '8px 12px'
            }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [`${value} m/s`, 'Velocidad']}
            labelFormatter={(label) => `t = ${parseFloat(label).toFixed(2)}s`}
          />
          <Area 
            type="monotone" 
            dataKey="velocity" 
            stroke="#0f172a" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorVelocity)" 
          />
          
          <ReferenceDot 
            x={time} 
            y={currentVelocity} 
            r={5} 
            fill="#fff" 
            stroke="#0f172a" 
            strokeWidth={3} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};