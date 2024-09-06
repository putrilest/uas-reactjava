import React, { useState, useEffect } from 'react';
import Sidebar from '../Component/Sidebar';
import Header from '../Component/Header';

const Dashboard: React.FC = () => {
  const [jumlahPegawai, setJumlahPegawai] = useState<number>(0);
  const [jumlahJabatan, setJumlahJabatan] = useState<number>(0);
  const [jumlahGaji, setJumlahGaji] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pegawaiResponse = await fetch('http://localhost:8080/api/pegawai');
        const pegawaiData = await pegawaiResponse.json();
        setJumlahPegawai(pegawaiData.length);

        const jabatanResponse = await fetch('http://localhost:8080/api/jabatan');
        const jabatanData = await jabatanResponse.json();
        setJumlahJabatan(jabatanData.length);

        const gajiResponse = await fetch('http://localhost:8080/api/penggajian');
        const gajiData = await gajiResponse.json();
        const totalGajiBersih = gajiData.reduce((acc: number, curr: any) => acc + curr.gajiBersih, 0);
        setJumlahGaji(totalGajiBersih);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <div className="flex-shrink-0">
                <img src="/gambar4.png" alt="Pegawai" className="w-16 h-16" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Jumlah Pegawai</h2>
                <p className="text-2xl font-bold">{jumlahPegawai}</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <div className="flex-shrink-0">
                <img src="/gambar4.png" alt="Jabatan" className="w-16 h-16" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Jumlah Jabatan</h2>
                <p className="text-2xl font-bold">{jumlahJabatan}</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
              <div className="flex-shrink-0">
                <img src="/gambar4.png" alt="Gaji" className="w-16 h-16" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Total Gaji</h2>
                <p className="text-2xl font-bold">{jumlahGaji.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img src="/gambar4.png" className="w-full max-w-4xl h-auto" alt="Center Image" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
