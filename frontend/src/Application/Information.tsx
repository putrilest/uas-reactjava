import React from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

const Information: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Informasi Penggajian</h1>
            <p className="mb-4">
              Aplikasi ini merupakan sistem informasi penggajian sederhana untuk mengelola gaji karyawan. Aplikasi ini masih dalam pengembangan sehingga masih banyak kekurangan. Terdapat beberapa informasi mengenai aplikasi ini, antara lain:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Aplikasi ini dibatasi dengan pengelolaan gaji tidak sekaligus pengelolaan absensi karyawan.</li>
              <li>Gaji Bersih dihitung dari gaji pokok karyawan ditambah tunjangan transportasi ditambah tunjangan makan ditambah THR dan dikurangi dengan potongan gaji, BPJS Kesehatan dan Iuran JHT.</li>
              <li>Besarnya tunjangan transportasi adalah 10% dari gaji pokok.</li>
              <li>Besarnya tunjangan makan adalah 15% dari gaji pokok.</li>
              <li>Pada Peraturan Presiden Nomor 75 Tahun 2019 disebutkan bahwa iuran BPJS Kesehatan untuk pekerja adalah sebesar 5% dari gaji bulanan karyawan (4% akan dibayarkan oleh perusahaan, 1% akan dibayar lewat pengurangan gaji karyawan).</li>
              <li>Dalam Pasal 16 PP 46/2015, iuran JHT ditetapkan sebesar 5,70% dari upah sebulan. Jumlah iuran tersebut terdiri dari 3,70% yang ditanggung perusahaan dan 2% ditanggung oleh pegawai.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
