const Header = () => {
  const logout= () => {
    if(localStorage.getItem("token")){
      alert("Apakah anda yakin keluar dari program ?");
      localStorage.removeItem("token");
      window.location.reload();
    }
  }
  return (
    <header className="flex justify-between h-16 w-full p-4 bg-blue-400 items-center text-black px-3">
      <div className="flex fllex-row">
        <img src="/gambar3.png" className="w-8 h-8 mr-2 tablet:w-6 tablet:h-6 mobile:w-6 mobile:h-6"/>
        <h1 className="text-xl  font-bold">GAJI KITA</h1>
      </div>
    </header>
  )
}

export default Header