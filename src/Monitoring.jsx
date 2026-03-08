import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';

export default function Monitoring() {
  // State untuk daftar sensor (Gauge)
  const [gauges, setGauges] = useState([
  ]);

  // Fungsi tambah Gauge (Max 6)
  const addGauge = async() => {
    if (gauges.length < 6) {
      const newId = Date.now();
      const newGauge = {
        id: newId,
        name: `New Sensor ${gauges.length + 1}`,
        value: 10,
        unit: "Volt",
        min: 0,
        max: 100
      }
      try {
        const rawData = await axios.post(`http://localhost:3000/api/metergauge`, newGauge);

        setGauges([...gauges, newGauge]);

        console.log(`Response add gauge: ${JSON.stringify(rawData.data)}`);

      } catch (error) {
        console.log(`There is an error when add gauge: ${error}`);
      }

    } else {
      alert("Maksimal 6 Meter Gauge untuk menjaga visibilitas!");
    }
  };

  const removeGauge = async(id) => {
    try {
      const rawData = await axios.delete(`http://localhost:3000/api/metergauge/${id}`);
      
      console.log(`Response delete meter gauge ${JSON.stringify(rawData.data)}`);
      
      setGauges(gauges.filter(g => g.id !== id));

    } catch (error) {
      console.log(`There is an error when delete meter gauge ${error}`);
    }
  };

  const loadedMeterGauge = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/metergauge`);

      console.log(`Ini meter gauge kita: ${JSON.stringify(rawData.data)}`);
      if(rawData.data.payload.datas.length > 0){
        setGauges(rawData.data.payload.datas);
      } else {
        setGauges([])
      }
    } catch (error) {
      console.log(`There is an error when get meter gauge from backend: ${error}`);
    }
  }

  // Akan dipanggil setiap halaman refresh
  useEffect(()=>{
    loadedMeterGauge();
  },[])

  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Real-time Monitoring</h1>
          <p className="text-slate-200/70 font-notosans font-light text-sm mt-2">
            Visualizing your sensor data. Max: 6 Gauges.
          </p>
        </div>
        <button 
          onClick={addGauge}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          + Add Gauge
        </button>
      </div>

      {/* Grid Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {gauges.length > 0 && (
        gauges.map((gauge) => (
          <div key={gauge.id} className="bg-slate-800 border border-slate-700 p-6 rounded-3xl shadow-xl flex flex-col items-center relative group">
            
            {/* Action Buttons (Hapus) */}
            <button 
              onClick={() => removeGauge(gauge.id)}
              className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            >
              Remove
            </button>

            <h3 className="text-slate-300 font-robotoflex font-medium mb-4 uppercase tracking-widest text-xs">
              {gauge.name}
            </h3>

            {/* Gauge Component */}
            <div className="w-full h-48">
              <GaugeComponent
  value={gauge.value}
  type="radial"
  minValue={gauge.min}
  maxValue={gauge.max}
  arc={{
    width: 0.2,
    padding: 0.03,
    cornerRadius: 1,
    subArcs: [
      { limit: gauge.max * 0.4, color: '#5BE12C' },
      { limit: gauge.max * 0.7, color: '#F5CD19' },
      { limit: gauge.max, color: '#EA4228' },
    ]
  }}
  // MODIFIKASI DI SINI
  pointer={{ 
    type: 'blob', 
    animationDelay: 0,
    showValue: true, 
    valueFormat: (val) => Math.round(val), // Membulatkan angka agar rapi
    valueStyle: { fill: '#f1f5f9', fontSize: '12px', fontWeight: 'bold' }
  }}
  labels={{
    valueLabel: { 
      formatTextValue: (val) => `${val} ${gauge.unit}`, 
      style: {fill: '#f1f5f9', textShadow: 'none'} 
    },
    tickLabels: { 
      type: 'inner', 
      ticks: [{ value: gauge.min }, { value: gauge.max }],
      defaultTickValueConfig: { 
      hideUnit: true,
      formatTextValue: (val) => val // Memastikan hanya angka yang muncul
    } 
    }
  }}
/>
            </div>
          </div>
        ))
        )}
        {gauges.length == 0 && (
          <p className='text-slate-200 font-notosans font-light text-sm'>No meter gauge</p>
        )}
      </div>
    </div>
  );
}