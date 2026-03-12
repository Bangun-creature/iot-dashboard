import React, { useEffect, useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';
import ConfigurationMeterGauge from './ConfigurationMeterGauge';
import mqtt from 'mqtt';

export default function Monitoring() {
  // State untuk daftar sensor (Gauge)
  const [gauges, setGauges] = useState([
  ]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isConfigurationOpen, setIsConfigurationOpen] = useState(false);
  const [idMeterConfiguration, setIdMeterConfiguration] = useState(null);

  // Fungsi tambah Gauge (Max 6)
  const addGauge = async() => {
    setIsOpenModal(true);
    
  };

  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    min: 0,
    max: 100
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({
      ...formData, 
      [name]: value
    })
  }

  const handleSubmitButton = async()=>{
    // e.preventDefault();

    if (gauges.length >= 6) {
      alert("Maksimal 6 Meter Gauge untuk menjaga visibilitas!");
    }

      // const newId = Date.now();
      const newGauge = {
        id: Date.now(),
        name: formData.name,
        value: 0,
        unit: formData.unit,
        min: Number(formData.min),
        max: Number(formData.max)
      }
      try {
        console.log(`Ini data barunya: ${JSON.stringify(newGauge)}`);
        const rawData = await axios.post(`http://localhost:3000/api/metergauge`, newGauge);

        setGauges([...gauges, newGauge]);

        
        setFormData({
          name: "",
          unit: "",
          min: 0,
          max: 100
        })
        
        setIsOpenModal(false);
        
        console.log(`Response add gauge: ${JSON.stringify(rawData.data)}`);
      } catch (error) {
        console.log(`There is an error when add gauge: ${error}
          `);
          alert("Gagal menambah gauge ke database");
      }

    
    
  }

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

  function handleConfigurationOpen(id){
    setIsConfigurationOpen(true);
    setIdMeterConfiguration(id);
    console.log(`Id ${id}`)
  }

  useEffect(()=>{
    // Koneksi mqtt:
    const client = mqtt.connect(`ws://broker.emqx.io:8083/mqtt`);

    client.on('connect', ()=> {
      console.log(`Succes Connecter to MQTT`);
      client.subscribe('/unnes/iot-e/meter/+');
    })

    client.on('message', (topic, message)=>{
      const topicPart = topic.split('/');
      const incomingId = topicPart[topicPart.length - 1];
      const newValue = parseFloat(message.toString());

      console.log(`Id data: ${incomingId} -> value: ${newValue}`);

      setGauges((prev)=>
      prev.map((item)=>
      item.id == incomingId ? {...item, value: newValue} : item
      )
      )
    })

    return()=>{
      if(client) client.end()
    }
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
      {isOpenModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={() => {setIsOpenModal(false)}}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md md:max-w-fit p-8 rounded-3xl z-10 shadow-2xl transform transition-all scale-100 animate-in zoom-in duration-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 font-robotoflex">Register New Card</h2>
          <p className="text-slate-400 text-sm">Tap the RFID card to the reader device</p>
        </div>
        
        <form onSubmit={handleSubmitButton} className="flex flex-col gap-6">
          {/* Status Scanning Visual */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Name Gauge Meter</label>
            <input 
              autoFocus
              name='name'
              value={formData.name}
              onChange={handleChange}
              type="text" 
              placeholder="Voltage Meter, etc" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Unit</label>
            <input 
              autoFocus
              name='unit'
              value={formData.unit}
              onChange={handleChange}
              type="text" 
              placeholder="volt, ampere, etc" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Min Value</label>
            <input 
              autoFocus
              name='min'
              value={formData.min}
              onChange={handleChange}
              type="text" 
              placeholder="0" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Max Value</label>
            <input 
              autoFocus
              name='max'
              value={formData.max}
              onChange={handleChange}
              type="text" 
              placeholder="200/etc" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>
          </div>



          <div className="flex gap-3 mt-4">
            <button 
              type="button"
              onClick={()=>{setIsOpenModal(false)}}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-4 rounded-2xl font-bold transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
      )}
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
            <button onClick={()=>{handleConfigurationOpen(gauge.id)}} className='text-slate-100 text-xs font-medium font-notosans bg-emerald-600 rounded-lg w-fit px-2 py-1 mt-5'>Configuration</button>
          </div>
        ))
        )}
        {gauges.length == 0 && (
          <p className='text-slate-200 font-notosans font-light text-sm'>No meter gauge</p>
        )}
      </div>
      {/* Modal Meter Gauge */}
      <ConfigurationMeterGauge 
            isOpen={isConfigurationOpen}
            onClose={()=> setIsConfigurationOpen(false)}
            idMeterConfiguration={idMeterConfiguration}
      />
    </div>
  );
}