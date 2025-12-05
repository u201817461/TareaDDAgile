import React, { useState, useEffect } from 'react';
import { InputControl } from './components/InputControl';
import { PhysicsChart } from './components/PhysicsChart';
import { getVelocityAnalogy } from './services/geminiService';
import { Calculator, Zap, Info, RotateCcw, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [distance, setDistance] = useState<number | ''>('');
  const [time, setTime] = useState<number | ''>('');
  const [velocity, setVelocity] = useState<number | null>(null);
  
  // AI State
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  // Errors
  const [timeError, setTimeError] = useState<string>('');
  const [distanceError, setDistanceError] = useState<string>('');

  // Auto-calculate effect
  useEffect(() => {
    setAiAnalysis(null); // Reset AI analysis on value change

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
      if (time === 0) setTimeError('El tiempo no puede ser cero (división por cero)');
      else setTimeError('El tiempo no puede ser negativo');
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
    setAiAnalysis(null);
    setDistanceError('');
    setTimeError('');
  };

  const handleAIAnalysis = async () => {
    if (velocity !== null && distance !== '' && time !== '') {
      setIsAnalysing(true);
      const analogy = await getVelocityAnalogy(velocity, Number(distance), Number(time));
      setAiAnalysis(analogy);
      setIsAnalysing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header */}
      <div className="max-w-4xl w-full text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Simulador de Velocidad</h1>
        </div>
        <p className="text-slate-500 text-lg">Proyecto de Ingeniería: Cinemática Básica</p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Controls & Formula */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Formula Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" /> Fórmula
            </h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
               <span className="text-4xl font-serif font-italic text-slate-800 mb-2">v = d / t</span>
               <div className="text-sm text-slate-500 grid grid-cols-3 gap-4 w-full text-center mt-2">
                 <div>
                   <span className="block font-bold text-slate-700">v</span>
                   Velocidad
                 </div>
                 <div>
                   <span className="block font-bold text-slate-700">d</span>
                   Distancia
                 </div>
                 <div>
                   <span className="block font-bold text-slate-700">t</span>
                   Tiempo
                 </div>
               </div>
            </div>
          </div>

          {/* Input Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <h2 className="text-lg font-bold text-slate-800 mb-6">Variables de Entrada</h2>
            
            <div className="space-y-5">
              <InputControl 
                label="Distancia (d)" 
                unit="metros" 
                value={distance} 
                onChange={setDistance}
                placeholder="Ej. 100"
                error={distanceError}
              />
              <InputControl 
                label="Tiempo (t)" 
                unit="segundos" 
                value={time} 
                onChange={setTime}
                placeholder="Ej. 9.58"
                error={timeError}
              />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
               <span className="text-xs text-slate-400 font-medium italic">Calculado automáticamente</span>
               <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors px-3 py-1 rounded-md hover:bg-slate-100"
               >
                 <RotateCcw className="w-4 h-4" />
                 Reiniciar
               </button>
            </div>
          </div>

          {/* AI Feature */}
          {velocity !== null && (
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-6 rounded-2xl shadow-lg text-white">
              <div className="flex items-start gap-3">
                <BrainCircuit className="w-6 h-6 mt-1 text-indigo-200" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Análisis Inteligente</h3>
                  <p className="text-indigo-100 text-sm mb-4">Usa IA para entender la magnitud de esta velocidad.</p>
                  
                  {!aiAnalysis ? (
                    <button 
                      onClick={handleAIAnalysis}
                      disabled={isAnalysing}
                      className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isAnalysing ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          Analizando...
                        </>
                      ) : (
                        "Explicar Resultado"
                      )}
                    </button>
                  ) : (
                    <div className="bg-white/10 p-3 rounded-lg border border-white/10 text-sm leading-relaxed animate-fade-in">
                      {aiAnalysis}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Results & Visualization */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Numeric Result Panel */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-slate-500 font-semibold mb-1 uppercase text-sm tracking-wider">Resultado Calculado</h3>
              <div className="flex items-baseline gap-3">
                <span className={`text-6xl font-black tracking-tight ${velocity !== null ? 'text-blue-600' : 'text-slate-200'}`}>
                  {velocity !== null ? velocity.toFixed(2) : '--'}
                </span>
                <span className="text-2xl font-medium text-slate-400">m/s</span>
              </div>
            </div>
            
            {velocity !== null && (
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-xs text-slate-500 font-bold uppercase mb-1">Kilómetros por hora</span>
                    <span className="text-2xl font-bold text-slate-700">{(velocity * 3.6).toFixed(1)} <span className="text-sm font-normal text-slate-400">km/h</span></span>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-xs text-slate-500 font-bold uppercase mb-1">Ritmo</span>
                    <span className="text-2xl font-bold text-slate-700">{(velocity > 0 ? (1000/velocity/60).toFixed(1) : 0)} <span className="text-sm font-normal text-slate-400">min/km</span></span>
                 </div>
              </div>
            )}
          </div>

          {/* Visualization Graph */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-500" /> Visualización Gráfica
              </h2>
            </div>
            
            {velocity !== null && distance !== '' && time !== '' ? (
              <PhysicsChart distance={Number(distance)} time={Number(time)} currentVelocity={velocity} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[300px] border-2 border-dashed border-slate-100 rounded-xl">
                 <Zap className="w-12 h-12 mb-3 text-slate-200" />
                 <p>Ingresa distancia y tiempo para visualizar la curva.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;