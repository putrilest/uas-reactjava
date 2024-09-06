import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

interface Jabatan {
  id: number;
  namaJabatan: string;
}

interface Pegawai {
  id: number;
  nama: string;
  npwp: string;
  gender: string;
  alamat: string;
  telepon: string;
  email: string;
  tanggalMasuk: string;
  namaRekeneing: string;
  nomorRekening: string;
  jabatan: Jabatan;
}

const Employee: React.FC = () => {
  const [employees, setEmployees] = useState<Pegawai[]>([]);
  const [jabatans, setJabatans] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Pegawai | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pegawai');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data: Pegawai[] = await response.json();
        setEmployees(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

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

    fetchEmployees();
    fetchJabatans();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/pegawai/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      setEmployees(employees.filter((employee) => employee.id !== id));
      alert('Employee deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee');
    }
  };

  const handleDetail = (employee: Pegawai) => {
    setSelectedEmployee(employee);
    setIsDetailOpen(true);
  };

  const handleEdit = (employee: Pegawai) => {
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedEmployee) return;

    try {
      const response = await fetch(`http://localhost:8080/api/pegawai/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to edit employee');
      }

      setEmployees(employees.map((emp) => (emp.id === selectedEmployee.id ? selectedEmployee : emp)));
      alert('Employee edited successfully');
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to edit employee');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Daftar Pegawai</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nama Pegawai</th>
                <th className="py-2 px-4 border-b">Nama Jabatan</th>
                <th className="py-2 px-4 border-b">Tanggal Masuk</th>
                <th className="py-2 px-4 border-b">Nomor Rekening</th>
                <th className="py-2 px-4 border-b">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((pegawai) => (
                <tr key={pegawai.id}>
                  <td className="py-2 px-4 border-b text-center">{pegawai.id}</td>
                  <td className="py-2 px-4 border-b text-center">{pegawai.nama}</td>
                  <td className="py-2 px-4 border-b text-center">{pegawai.jabatan.namaJabatan}</td>
                  <td className="py-2 px-4 border-b text-center">{pegawai.tanggalMasuk}</td>
                  <td className="py-2 px-4 border-b text-center">{pegawai.nomorRekening}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDetail(pegawai)}
                      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 mr-2"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleEdit(pegawai)}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pegawai.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Detail Pegawai</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedEmployee.id}</p>
              <p><strong>Nama:</strong> {selectedEmployee.nama}</p>
              <p><strong>NPWP:</strong> {selectedEmployee.npwp}</p>
              <p><strong>Jenis Kelamin:</strong> {selectedEmployee.gender}</p>
              <p><strong>Alamat:</strong> {selectedEmployee.alamat}</p>
              <p><strong>Telepon:</strong> {selectedEmployee.telepon}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Tanggal Masuk:</strong> {selectedEmployee.tanggalMasuk}</p>
              <p><strong>Nama Rekening:</strong> {selectedEmployee.namaRekeneing}</p>
              <p><strong>Nomor Rekening:</strong> {selectedEmployee.nomorRekening}</p>
              <p><strong>Jabatan:</strong> {selectedEmployee.jabatan.namaJabatan}</p>
            </div>
            <button
              onClick={() => setIsDetailOpen(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Edit Pegawai</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4"> {/* Changed layout */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nama:</label>
                    <input
                      type="text"
                      value={selectedEmployee.nama}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, nama: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">NPWP:</label>
                    <input
                      type="text"
                      value={selectedEmployee.npwp}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, npwp: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Jenis Kelamin:</label>
                    <select
                      value={selectedEmployee.gender}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, gender: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    >
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Alamat:</label>
                    <textarea
                      value={selectedEmployee.alamat}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, alamat: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Telepon:</label>
                    <input
                      type="text"
                      value={selectedEmployee.telepon}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, telepon: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                      type="email"
                      value={selectedEmployee.email}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, email: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Tanggal Masuk:</label>
                    <input
                      type="date"
                      value={selectedEmployee.tanggalMasuk}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, tanggalMasuk: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nama Rekening:</label>
                    <input
                      type="text"
                      value={selectedEmployee.namaRekeneing}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, namaRekeneing: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nomor Rekening:</label>
                    <input
                      type="text"
                      value={selectedEmployee.nomorRekening}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, nomorRekening: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Jabatan:</label>
                    <select
                      value={selectedEmployee.jabatan.id}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          jabatan: jabatans.find((jab) => jab.id === parseInt(e.target.value)) || selectedEmployee.jabatan,
                        })
                      }
                      className="border border-gray-300 rounded-lg w-full p-2"
                      required
                    >
                      {jabatans.map((jabatan) => (
                        <option key={jabatan.id} value={jabatan.id}>
                          {jabatan.namaJabatan}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Employee;
