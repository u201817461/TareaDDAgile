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
  Label
} from 'recharts';

interface PhysicsChartProps {
  distance: number;
  time: number;
  currentVelocity: number;
}

export const PhysicsChart: React.FC<PhysicsChartProps> = ({ distance, time, currentVelocity }) => {
  // Generate data points for Velocity vs Time (fixing Distance)
  // Logic: v = d / t. We want to show how varying time affects velocity.
  const chartData = useMemo(() => {
    if (distance <= 0 || time <= 0) return [];

    const points = [];
    // Generate range from 0.5 * time to 2.0 * time
    const startT = Math.max(0.1, time * 0.2);
    const endT = time * 2.5;
    const steps = 30;
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

  if (distance <= 0 || time <= 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
        Ingresa valores válidos para ver la gráfica
      </div>
    );
  }

  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">
        Relación Velocidad vs. Tiempo (Distancia Constante: {distance}m)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            label={{ value: 'Tiempo (s)', position: 'insideBottom', offset: -10, fill: '#64748b' }} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Velocidad (m/s)', angle: -90, position: 'insideLeft', fill: '#64748b' }} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: number) => [`${value} m/s`, 'Velocidad']}
            labelFormatter={(label) => `Tiempo: ${parseFloat(label).toFixed(2)} s`}
          />
          <Line 
            type="monotone" 
            dataKey="velocity" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={false} 
            activeDot={{ r: 6 }} 
          />
          {/* Highlight the current calculated point */}
          <ReferenceDot x={time} y={currentVelocity} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2}>
             <Label value="Tu resultado" position="top" fill="#ef4444" fontSize={12} fontWeight="bold" />
          </ReferenceDot>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};