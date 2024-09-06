import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

interface Jabatan {
  id: number;
  namaJabatan: string;
  gajiPokok: number;
}

const Position: React.FC = () => {
  const [positions, setPositions] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [newPosition, setNewPosition] = useState<Omit<Jabatan, 'id'>>({ namaJabatan: '', gajiPokok: 0 });
  const [editPosition, setEditPosition] = useState<Jabatan | null>(null);

  // State for search, sort, and filter
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof Jabatan>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [minSalaryFilter, setMinSalaryFilter] = useState<number>(0);
  const [maxSalaryFilter, setMaxSalaryFilter] = useState<number>(Infinity);

  const fetchPositions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/jabatan');
      if (!response.ok) {
        throw new Error('Failed to fetch positions');
      }
      const data: Jabatan[] = await response.json();
      setPositions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleAddPosition = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/jabatan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPosition),
      });

      if (!response.ok) {
        throw new Error('Failed to add position');
      }

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const addedPosition: Jabatan = await response.json();
        setPositions([...positions, addedPosition]);
      } else {
        const textResponse = await response.text();
        alert(`Success: ${textResponse}`);
        await fetchPositions();
      }

      setIsModalOpen(false);
      setNewPosition({ namaJabatan: '', gajiPokok: 0 });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeletePosition = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/jabatan/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete position');
      }

      await fetchPositions();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEditPosition = async () => {
    if (editPosition) {
      try {
        const response = await fetch(`http://localhost:8080/api/jabatan/${editPosition.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editPosition),
        });

        if (!response.ok) {
          throw new Error('Failed to edit position');
        }

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
          const updatedPosition: Jabatan = await response.json();
          setPositions(
            positions.map((position) =>
              position.id === editPosition.id ? updatedPosition : position
            )
          );
        } else {
          const textResponse = await response.text();
          alert(`Success: ${textResponse}`);
          await fetchPositions();
        }

        setIsEditModalOpen(false);
        setEditPosition(null);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  // Function to handle search, sort, and filter
  const filteredAndSortedPositions = positions
    .filter((jabatan) =>
      jabatan.namaJabatan.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((jabatan) => jabatan.gajiPokok >= minSalaryFilter && jabatan.gajiPokok <= maxSalaryFilter)
    .sort((a, b) => {
      const sortOrder = sortDirection === 'asc' ? 1 : -1;
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='flex'>
        <Sidebar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Daftar Jabatan</h1>

          {/* Search, Sort, and Filter Controls */}
          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by Nama Jabatan"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              <div>
                <label className="block text-gray-700">Sort By</label>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as keyof Jabatan)}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="id">ID</option>
                  <option value="namaJabatan">Nama Jabatan</option>
                  <option value="gajiPokok">Gaji Pokok</option>
                </select>
                <select
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
                  className="ml-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Filter by Gaji Pokok</label>
                <input
                  type="number"
                  placeholder="Min Gaji"
                  value={minSalaryFilter}
                  onChange={(e) => setMinSalaryFilter(parseFloat(e.target.value))}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                  type="number"
                  placeholder="Max Gaji"
                  value={maxSalaryFilter}
                  onChange={(e) => setMaxSalaryFilter(parseFloat(e.target.value))}
                  className="ml-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nama Jabatan</th>
                <th className="py-2 px-4 border-b">Gaji Pokok</th>
                <th className="py-2 px-4 border-b">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPositions.map((jabatan) => (
                <tr key={jabatan.id}>
                  <td className="py-2 px-4 border-b text-center">{jabatan.id}</td>
                  <td className="py-2 px-4 border-b">{jabatan.namaJabatan}</td>
                  <td className="py-2 px-4 border-b text-right">
                    {jabatan.gajiPokok.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => {
                        setEditPosition(jabatan);
                        setIsEditModalOpen(true);
                      }}
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePosition(jabatan.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Tambah Jabatan
          </button>

          {/* Add Position Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Tambah Jabatan</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nama Jabatan
                  </label>
                  <input
                    type="text"
                    value={newPosition.namaJabatan}
                    onChange={(e) => setNewPosition({ ...newPosition, namaJabatan: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gaji Pokok
                  </label>
                  <input
                    type="number"
                    value={newPosition.gajiPokok}
                    onChange={(e) => setNewPosition({ ...newPosition, gajiPokok: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleAddPosition}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Position Modal */}
          {isEditModalOpen && editPosition && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Edit Jabatan</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nama Jabatan
                  </label>
                  <input
                    type="text"
                    value={editPosition.namaJabatan}
                    onChange={(e) =>
                      setEditPosition({ ...editPosition, namaJabatan: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gaji Pokok
                  </label>
                  <input
                    type="number"
                    value={editPosition.gajiPokok}
                    onChange={(e) =>
                      setEditPosition({
                        ...editPosition,
                        gajiPokok: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditPosition(null);
                    }}
                    className="mr-2 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleEditPosition}
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Position;
