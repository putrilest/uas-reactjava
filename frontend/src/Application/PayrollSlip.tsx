import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

interface PayrollSlipProps {
  payroll: Payroll;
}

const PayrollSlip: React.FC<PayrollSlipProps> = ({ payroll }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Payroll Slip', 14, 20);

    const tableData = [
      ['Field', 'Value'],
      ['ID', payroll.id.toString()],
      ['Periode', new Date(payroll.periode).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })],
      ['Nama Pegawai', payroll.pegawai.nama],
      ['Gaji Pokok', payroll.gajiPokok.toString()],
      ['Tunjangan Transport', payroll.tunjanganTransport.toString()],
      ['Tunjangan Makan', payroll.tunjanganMakan.toString()],
      ['Potongan Gaji', payroll.potonganGaji.toString()],
      ['BPJS Kesehatan', payroll.bpjsKesehatan.toString()],
      ['JHT', payroll.jht.toString()],
      ['THR', payroll.thr.toString()],
      ['Bonus', payroll.bonus.toString()],
      ['Gaji Bersih', payroll.gajiBersih.toString()],
    ];

    autoTable(doc, {
      head: [['Field', 'Value']],
      body: tableData,
    });

    doc.save(`Payroll_Slip_${payroll.id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="text-green-500 hover:text-green-700"
    >
      Download Slip
    </button>
  );
};

export default PayrollSlip;
