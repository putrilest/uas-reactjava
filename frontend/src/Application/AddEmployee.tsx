import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

interface Jabatan {
  id: number;
  namaJabatan: string;
}

const AddEmployee: React.FC = () => {
  const [nama, setNama] = useState<string>('');
  const [npwp, setNpwp] = useState<string>('');
  const [gender, setGender] = useState<string>('Male');
  const [alamat, setAlamat] = useState<string>('');
  const [telepon, setTelepon] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [tanggalMasuk, setTanggalMasuk] = useState<string>('');
  const [namaRekeneing, setNamaRekeneing] = useState<string>('');
  const [nomorRekening, setNomorRekening] = useState<string>('');
  const [jabatanId, setJabatanId] = useState<number | null>(null);
  const [jabatans, setJabatans] = useState<Jabatan[]>([]);

  useEffect(() => {
    const fetchJabatans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jabatan');
        if (!response.ok) {
          throw new Error('Failed to fetch jabatans');
        }
        const data: Jabatan[] = await response.json();
        setJabatans(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJabatans();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const employeeData = {
      npwp,
      nama,
      gender,
      alamat,
      telepon,
      email,
      tanggalMasuk,
      namaRekeneing,
      nomorRekening,
      jabatan: { id: jabatanId }
    };

    try {
      const response = await fetch('http://localhost:8080/api/pegawai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      alert('Employee added successfully');
      setNama('');
      setNpwp('');
      setGender('Male');
      setAlamat('');
      setTelepon('');
      setEmail('');
      setTanggalMasuk('');
      setNamaRekeneing('');
      setNomorRekening('');
      setJabatanId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add employee');
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Tambah Pegawai</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {/* Nama */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nama:</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* NPWP */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">NPWP:</label>
              <input
                type="text"
                value={npwp}
                onChange={(e) => setNpwp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                maxLength={16}
                required
              />
            </div>
            {/* Jenis Kelamin */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Jenis Kelamin:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Male">Laki-laki</option>
                <option value="Female">Perempuan</option>
              </select>
            </div>
            {/* Alamat */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Alamat:</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Telepon */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Telepon:</label>
              <input
                type="text"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Tanggal Masuk */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Tanggal Masuk:</label>
              <input
                type="date"
                value={tanggalMasuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Nama Rekening */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nama Rekening:</label>
              <input
                type="text"
                value={namaRekeneing}
                onChange={(e) => setNamaRekeneing(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Nomor Rekening */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nomor Rekening:</label>
              <input
                type="text"
                value={nomorRekening}
                onChange={(e) => setNomorRekening(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {/* Jabatan */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Jabatan:</label>
              <select
                value={jabatanId ?? ''}
                onChange={(e) => setJabatanId(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Pilih Jabatan</option>
                {jabatans.map((jabatan) => (
                  <option key={jabatan.id} value={jabatan.id}>
                    {jabatan.namaJabatan}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Tambah Pegawai
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
