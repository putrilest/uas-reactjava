import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import PayrollSlip from './PayrollSlip';

interface Pegawai {
  id: number;
  nama: string;
  tunjanganTransport: number;
  tunjanganMakan: number;
  thr: number;
  bpjsKesehatan: number;
}

interface Payroll {
  id: number;
  periode: string;
  pegawai: Pegawai;
  gajiPokok: number;
  tunjanganTransport: number;
  tunjanganMakan: number;
  potonganGaji: number;
  bpjsKesehatan: number;
  jht: number;
  thr: number;
  bonus: number;
  gajiBersih: number;
}

const PayrollList: React.FC = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [employees, setEmployees] = useState<Pegawai[]>([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/penggajian');
        if (!response.ok) {
          throw new Error('Failed to fetch payrolls');
        }
        const data: Payroll[] = await response.json();
        setPayrolls(data);
      } catch (error) {
        console.error('Error fetching payrolls:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pegawai');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data: Pegawai[] = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchPayrolls();
    fetchEmployees();
  }, []);

  const handleEdit = (payroll: Payroll) => {
    setSelectedPayroll(payroll);
    setIsEditPopupOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/penggajian/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete payroll');
      }
      setPayrolls(payrolls.filter((payroll) => payroll.id !== id));
    } catch (error) {
      console.error('Error deleting payroll:', error);
    }
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedPayroll(null);
  };

  const calculateGajiBersih = (payroll: Payroll): number => {
    return payroll.gajiPokok + payroll.tunjanganTransport + payroll.tunjanganMakan +
           payroll.thr - payroll.potonganGaji - payroll.bpjsKesehatan - payroll.jht;
  };

  const handleEditSubmit = async (updatedPayroll: Payroll) => {
    try {
      updatedPayroll.gajiBersih = calculateGajiBersih(updatedPayroll);
      const response = await fetch(`http://localhost:8080/api/penggajian/${updatedPayroll.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayroll),
      });
      if (!response.ok) {
        throw new Error('Failed to update payroll');
      }
      setPayrolls(payrolls.map((payroll) => (payroll.id === updatedPayroll.id ? updatedPayroll : payroll)));
      closeEditPopup();
    } catch (error) {
      console.error('Error updating payroll:', error);
    }
  };

  const handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmployeeId = parseInt(event.target.value);
    const selectedEmployee = employees.find((employee) => employee.id === selectedEmployeeId);
    if (selectedEmployee && selectedPayroll) {
      setSelectedPayroll({
        ...selectedPayroll,
        pegawai: selectedEmployee,
        tunjanganTransport: selectedEmployee.tunjanganTransport,
        tunjanganMakan: selectedEmployee.tunjanganMakan,
        thr: selectedEmployee.thr,
        bpjsKesehatan: selectedEmployee.bpjsKesehatan,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Payroll List</h1>
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Periode</th>
                <th className="px-4 py-2 border">Nama Pegawai</th>
                <th className="px-4 py-2 border">Gaji Pokok</th>
                <th className="px-4 py-2 border">Tunjangan Transport</th>
                <th className="px-4 py-2 border">Tunjangan Makan</th>
                <th className="px-4 py-2 border">Potongan Gaji</th>
                <th className="px-4 py-2 border">BPJS Kesehatan</th>
                <th className="px-4 py-2 border">JHT</th>
                <th className="px-4 py-2 border">THR</th>
                <th className="px-4 py-2 border">Bonus</th>
                <th className="px-4 py-2 border">Gaji Bersih</th>
                <th className="px-4 py-2 border">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((payroll) => (
                <tr key={payroll.id}>
                  <td className="px-4 py-2 border">{payroll.id}</td>
                  <td className="px-4 py-2 border">{new Date(payroll.periode).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</td>
                  <td className="px-4 py-2 border">{payroll.pegawai.nama}</td>
                  <td className="px-4 py-2 border">{payroll.gajiPokok}</td>
                  <td className="px-4 py-2 border">{payroll.tunjanganTransport}</td>
                  <td className="px-4 py-2 border">{payroll.tunjanganMakan}</td>
                  <td className="px-4 py-2 border">{payroll.potonganGaji}</td>
                  <td className="px-4 py-2 border">{payroll.bpjsKesehatan}</td>
                  <td className="px-4 py-2 border">{payroll.jht}</td>
                  <td className="px-4 py-2 border">{payroll.thr}</td>
                  <td className="px-4 py-2 border">{payroll.bonus}</td>
                  <td className="px-4 py-2 border">{payroll.gajiBersih}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(payroll)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-2"
                      onClick={() => handleDelete(payroll.id)}
                    >
                      Delete
                    </button>
                    <button>
                      <PayrollSlip payroll={payroll}/>
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isEditPopupOpen && selectedPayroll && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-xl font-bold mb-4">Edit Payroll</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedPayroll: Payroll = {
                      ...selectedPayroll,
                      gajiBersih: calculateGajiBersih(selectedPayroll),
                    };
                    handleEditSubmit(updatedPayroll);
                  }}
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-2">Periode</label>
                      <input
                        type="month"
                        value={new Date(selectedPayroll.periode).toISOString().slice(0, 7)}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, periode: e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2">Nama Pegawai</label>
                      <select
                        value={selectedPayroll.pegawai.id}
                        onChange={handleEmployeeChange}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      >
                        <option value="">Pilih Pegawai</option>
                        {employees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-2">Gaji Pokok</label>
                      <input
                        type="number"
                        value={selectedPayroll.gajiPokok}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, gajiPokok: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2">Tunjangan Transport</label>
                      <input
                        type="number"
                        value={selectedPayroll.tunjanganTransport}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, tunjanganTransport: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-2">Tunjangan Makan</label>
                      <input
                        type="number"
                        value={selectedPayroll.tunjanganMakan}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, tunjanganMakan: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2">Potongan Gaji</label>
                      <input
                        type="number"
                        value={selectedPayroll.potonganGaji}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, potonganGaji: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-2">BPJS Kesehatan</label>
                      <input
                        type="number"
                        value={selectedPayroll.bpjsKesehatan}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, bpjsKesehatan: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2">JHT</label>
                      <input
                        type="number"
                        value={selectedPayroll.jht}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, jht: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-2">THR</label>
                      <input
                        type="number"
                        value={selectedPayroll.thr}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, thr: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-2">Bonus</label>
                      <input
                        type="number"
                        value={selectedPayroll.bonus}
                        onChange={(e) => setSelectedPayroll({ ...selectedPayroll, bonus: +e.target.value })}
                        className="border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-2">Gaji Bersih</label>
                      <input
                        type="number"
                        value={selectedPayroll.gajiBersih}
                        readOnly
                        className="border border-gray-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={closeEditPopup}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayrollList;
