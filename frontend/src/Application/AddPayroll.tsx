import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

interface Jabatan {
  gajiPokok: number;
}

interface Pegawai {
  id: number;
  nama: string;
  jabatan: Jabatan;
}

const AddPayroll: React.FC = () => {
  const [periode, setPeriode] = useState<string>('');
  const [pegawaiId, setPegawaiId] = useState<number | ''>('');
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);
  const [potonganGaji, setPotonganGaji] = useState<number>(0);
  const [bpjsKesehatan, setBpjsKesehatan] = useState<number>(0);
  const [jht, setJht] = useState<number>(0);
  const [thr, setThr] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [gajiBersih, setGajiBersih] = useState<number>(0);
  const [tunjanganTransport, setTunjanganTransport] = useState<number>(0);
  const [tunjanganMakan, setTunjanganMakan] = useState<number>(0);
  const [pegawais, setPegawais] = useState<Pegawai[]>([]);

  useEffect(() => {
    const fetchPegawais = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pegawai');
        if (!response.ok) {
          throw new Error('Failed to fetch pegawais');
        }
        const data: Pegawai[] = await response.json();
        setPegawais(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPegawais();
  }, []);

  useEffect(() => {
    if (pegawai) {
      const gajiPokok = pegawai.jabatan.gajiPokok;

      // Use gajiPokok to calculate tunjanganMakan, tunjanganTransport, bpjsKesehatan, and jht
      const presentaseTunjanganMakan = 0.15;
      const presentaseTunjanganTransport = 0.10;
      const presentaseBpjsKesehatan = 0.01;
      const presentaseJht = 0.02;

      const tunjanganMakanValue = Math.round(gajiPokok * presentaseTunjanganMakan);
      const tunjanganTransportValue = Math.round(gajiPokok * presentaseTunjanganTransport);
      const bpjsKesehatanValue = Math.round(gajiPokok * presentaseBpjsKesehatan);
      const jhtValue = Math.round(gajiPokok * presentaseJht);

      setTunjanganMakan(tunjanganMakanValue);
      setTunjanganTransport(tunjanganTransportValue);
      setBpjsKesehatan(bpjsKesehatanValue);
      setJht(jhtValue);

      // Calculate gajiBersih
      setGajiBersih(
        gajiPokok + tunjanganMakanValue + tunjanganTransportValue + thr + bonus - potonganGaji - bpjsKesehatanValue - jhtValue
      );
    }
  }, [pegawai, potonganGaji, thr, bonus]);

  const handlePegawaiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const idNumber = selectedId === '' ? '' : Number(selectedId);
    const selectedPegawai = pegawais.find((p) => p.id === idNumber);
  
    setPegawaiId(idNumber);  // Pass number or '' to match type
    setPegawai(selectedPegawai ?? null);
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (pegawaiId === '' || !pegawai) {
      alert('Pilih pegawai terlebih dahulu.');
      return;
    }

    const payrollData = {
        periode: `${periode}-01`, // Adjusting to a full date format
        pegawai: { id: pegawaiId },
        gajiPokok: pegawai.jabatan.gajiPokok,
        tunjanganTransport,
        tunjanganMakan,
        potonganGaji,
        bpjsKesehatan,
        jht,
        thr,
        bonus,
        gajiBersih,
      };
      

    try {
      const response = await fetch('http://localhost:8080/api/penggajian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payrollData),
      });

      if (!response.ok) {
        throw new Error('Failed to add payroll');
      }

      alert('Payroll added successfully');
      setPeriode('');
      setPegawaiId('');
      setPegawai(null);
      setTunjanganTransport(0);
      setTunjanganMakan(0);
      setPotonganGaji(0);
      setBpjsKesehatan(0);
      setJht(0);
      setThr(0);
      setBonus(0);
      setGajiBersih(0);
    } catch (err) {
      console.error(err);
      alert('Failed to add payroll');
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Tambah Payroll</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {/* Periode */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Periode:</label>
              <input
                type="month"
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Nama Pegawai */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nama Pegawai:</label>
              <select
                value={pegawaiId}
                onChange={handlePegawaiChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Pilih Pegawai</option>
                {pegawais.map((pegawai) => (
                  <option key={pegawai.id} value={pegawai.id}>
                    {pegawai.nama}
                  </option>
                ))}
              </select>
            </div>
            {/* Gaji Pokok */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gaji Pokok:</label>
              <input
                type="number"
                value={pegawai?.jabatan.gajiPokok ?? 0}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {/* Tunjangan Transport */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Tunjangan Transport:</label>
              <input
                type="number"
                value={tunjanganTransport}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {/* Tunjangan Makan */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Tunjangan Makan:</label>
              <input
                type="number"
                value={tunjanganMakan}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {/* Potongan Gaji */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Potongan Gaji:</label>
              <input
                type="number"
                value={potonganGaji}
                onChange={(e) => setPotonganGaji(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* BPJS Kesehatan */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">BPJS Kesehatan:</label>
              <input
                type="number"
                value={bpjsKesehatan}
                onChange={(e) => setBpjsKesehatan(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* JHT */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">JHT:</label>
              <input
                type="number"
                value={jht}
                onChange={(e) => setJht(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* THR */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">THR:</label>
              <input
                type="number"
                value={thr}
                onChange={(e) => setThr(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Bonus */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Bonus:</label>
              <input
                type="number"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Gaji Bersih */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gaji Bersih:</label>
              <input
                type="number"
                value={gajiBersih}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPayroll;
