import React, { useState, useEffect } from 'react';
import { InputControl } from './components/InputControl';
import { PhysicsChart } from './components/PhysicsChart';
import { Activity, ArrowRight, RotateCcw, Timer, Ruler, MoveRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans">
      
      {/* Navbar / Header */}
      <nav className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4 px-6 mb-8 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-md shadow-slate-200">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Simulador MRU</h1>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            Cinemática
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input & Formula */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main Control Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)] border border-slate-100/50">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Parámetros de Entrada</h2>
                <button 
                  onClick={handleReset}
                  className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all duration-300"
                  title="Reiniciar cálculo"
                >
                  <RotateCcw size={14} strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="space-y-8">
                <InputControl 
                  label="Distancia (d)" 
                  unit="m" 
                  value={distance} 
                  onChange={setDistance}
                  placeholder="0.00"
                  error={distanceError}
                  icon={<Ruler size={14} />}
                />
                
                {/* Visual Connector */}
                <div className="relative h-4 flex items-center justify-center">
                  <div className="absolute w-[1px] h-8 bg-slate-100 top-[-16px]"></div>
                </div>

                <InputControl 
                  label="Tiempo (t)" 
                  unit="s" 
                  value={time} 
                  onChange={setTime}
                  placeholder="0.00"
                  error={timeError}
                  icon={<Timer size={14} />}
                />
              </div>
            </div>

            {/* Formula Reference - Minimalist Light Version */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/60 flex flex-col items-center justify-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <MoveRight size={64} />
               </div>
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Fórmula</h3>
               <div className="flex items-center gap-4 text-3xl font-serif italic text-slate-800">
                 <span>v</span>
                 <span className="text-slate-300 text-2xl">=</span>
                 <div className="flex flex-col items-center leading-none">
                   <span>d</span>
                   <div className="w-full h-[1px] bg-slate-800 my-1"></div>
                   <span>t</span>
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Results & Viz */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Result Header */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)] border border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Velocidad Resultante</span>
                <div className="flex items-baseline gap-2">
                   {velocity !== null ? (
                     <>
                      <span className="text-6xl md:text-7xl font-light text-slate-900 tracking-tighter tabular-nums">
                        {velocity.toFixed(2)}
                      </span>
                      <span className="text-xl text-slate-400 font-medium">m/s</span>
                     </>
                   ) : (
                     <span className="text-6xl md:text-7xl font-light text-slate-200 tracking-tighter select-none">--</span>
                   )}
                </div>
              </div>

              {/* Secondary Units */}
              {velocity !== null && (
                <div className="flex gap-8 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 w-full md:w-auto mt-2 md:mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Kilómetros por hora</span>
                    <span className="text-2xl font-semibold text-slate-700 tabular-nums">{(velocity * 3.6).toFixed(1)} <span className="text-sm font-normal text-slate-400">km/h</span></span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Ritmo</span>
                    <span className="text-2xl font-semibold text-slate-700 tabular-nums">{(velocity > 0 ? (1000/velocity/60).toFixed(1) : 0)} <span className="text-sm font-normal text-slate-400">min/km</span></span>
                  </div>
                </div>
              )}
            </div>

            {/* Chart Container */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.05)] border border-slate-100/50 min-h-[420px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Gráfica Velocidad / Tiempo</h3>
                </div>
                {velocity !== null && (
                  <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    d = {Number(distance)}m constante
                  </div>
                )}
              </div>
              
              <div className="flex-1 w-full relative">
                {velocity !== null ? (
                  <PhysicsChart distance={Number(distance)} time={Number(time)} currentVelocity={velocity} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 opacity-30" />
                    </div>
                    <p className="text-sm font-medium">Introduce valores para visualizar la curva</p>
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