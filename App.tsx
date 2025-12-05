import React, { useState, useEffect } from 'react';
import { InputControl } from './components/InputControl';
import { PhysicsChart } from './components/PhysicsChart';
import { Activity, ArrowRight, RotateCcw, Timer, Ruler } from 'lucide-react';

const App: React.FC = () => {
  const [distance, setDistance] = useState<number | ''>('');
  const [time, setTime] = useState<number | ''>('');
  const [velocity, setVelocity] = useState<number | null>(null);

  // Errors
  const [timeError, setTimeError] = useState<string>('');
  const [distanceError, setDistanceError] = useState<string>('');

  // Auto-calculate effect
  useEffect(() => {
    if (distance === '' || time === '') {
      setVelocity(null);
      return;
    }

    // Validation
    let valid = true;
    if (distance < 0) {
      setDistanceError('La distancia no puede ser negativa');
      valid = false;
    } else {
      setDistanceError('');
    }

    if (time <= 0) {
      if (time === 0) setTimeError('División por cero');
      else setTimeError('El tiempo debe ser positivo');
      valid = false;
    } else {
      setTimeError('');
    }

    if (valid) {
      const v = Number(distance) / Number(time);
      setVelocity(v);
    } else {
      setVelocity(null);
    }
  }, [distance, time]);

  const handleReset = () => {
    setDistance('');
    setTime('');
    setVelocity(null);
    setDistanceError('');
    setTimeError('');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans selection:bg-slate-200">
      
      {/* Navbar / Header */}
      <nav className="w-full bg-white border-b border-slate-100 py-4 px-6 mb-8 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
            <Activity size={18} />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900">Simulador MRU</h1>
        </div>
        <div className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          Cinemática
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input & Formula */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main Control Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Parámetros</h2>
                <button 
                  onClick={handleReset}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all"
                  title="Reiniciar"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
              
              <div className="space-y-8">
                <InputControl 
                  label="Distancia" 
                  unit="m" 
                  value={distance} 
                  onChange={setDistance}
                  placeholder="0.00"
                  error={distanceError}
                  icon={<Ruler size={16} />}
                />
                
                <div className="relative flex justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-50"></div>
                  </div>
                </div>

                <InputControl 
                  label="Tiempo" 
                  unit="s" 
                  value={time} 
                  onChange={setTime}
                  placeholder="0.00"
                  error={timeError}
                  icon={<Timer size={16} />}
                />
              </div>
            </div>

            {/* Formula Reference */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
               <h3 className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">Fórmula Base</h3>
               <div className="flex items-center justify-between">
                 <div className="text-4xl font-light font-serif italic">v = d / t</div>
                 <div className="text-right space-y-1">
                   <div className="text-xs text-slate-400"><span className="text-white font-bold">v</span> · velocidad</div>
                   <div className="text-xs text-slate-400"><span className="text-white font-bold">d</span> · distancia</div>
                   <div className="text-xs text-slate-400"><span className="text-white font-bold">t</span> · tiempo</div>
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Results & Viz */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Result Header */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Velocidad Resultante</span>
                <div className="flex items-baseline gap-2">
                   {velocity !== null ? (
                     <>
                      <span className="text-6xl md:text-7xl font-light text-slate-900 tracking-tighter">
                        {velocity.toFixed(2)}
                      </span>
                      <span className="text-xl text-slate-400 font-medium">m/s</span>
                     </>
                   ) : (
                     <span className="text-6xl md:text-7xl font-light text-slate-200 tracking-tighter">--</span>
                   )}
                </div>
              </div>

              {/* Secondary Units */}
              {velocity !== null && (
                <div className="flex gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 w-full md:w-auto mt-2 md:mt-0">
                  <div>
                    <span className="block text-xs text-slate-400 font-medium mb-1">Km/h</span>
                    <span className="text-2xl font-semibold text-slate-700">{(velocity * 3.6).toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium mb-1">Ritmo (min/km)</span>
                    <span className="text-2xl font-semibold text-slate-700">{(velocity > 0 ? (1000/velocity/60).toFixed(1) : 0)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chart Container */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[400px] flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <h3 className="text-sm font-semibold text-slate-800">Proyección Gráfica</h3>
              </div>
              
              <div className="flex-1 w-full">
                {velocity !== null ? (
                  <PhysicsChart distance={Number(distance)} time={Number(time)} currentVelocity={velocity} />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center text-slate-300 gap-4 min-h-[300px]">
                    <ArrowRight className="w-8 h-8 opacity-20" />
                    <p className="text-sm font-medium">Introduce valores para generar la gráfica</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;