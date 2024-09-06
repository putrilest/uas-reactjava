import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-blue-400 text-white w-40 h-screen ml-0">      
      <aside
        className={`bg-lightBlue md:w-1/4${
          isSidebarOpen ? 'w-1/2' : 'w-0'
        } transition-all duration-300`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="block md:hidden text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <nav className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="space-y-2 flex flex-col gap-4">
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/dashboard">Dashboard</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/employee">Pegawai</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/addEmployee">Tambah Pegawai</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/position">Data Jabatan</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/payroll">Data Penggajian</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/addPayroll">Rekap Penggajian</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/information">Informasi</Link></li>
              <li><Link className="truncate hover:text-blue-200 hover:text-lg" to="/signout">Keluar</Link></li>
            </ul>
          </nav>
        </div>
        <div className="whitespace-nowrap text-xm text-center text-blue-200 ml-auto mt-72">&copy; 2023 PutriL</div>
      </aside>
    </div>
  );
};

export default Sidebar;
