import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Instance untuk navigasi

  function setCookie(name, value, days){
    let expires="";
    if (days){
      const date = new Date();
      date.setTime(date.getTime() + days*24*60*60*1000);
      expires=";expires=" + date.toUTCString();
    }
    document.cookie=name + "=" + (value || "") + expires + ";path=/";
  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/api/auth/sign-in?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        const token = await response.text();
        alert("Success Sign-in");
        setCookie("token", token, 7); 
        navigate('/dashboard'); 
      } else if (response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Failed to sign in');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setError('An error occurred during sign in');
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded overflow-hidden">
        <div className="w-1/2">
          {/* Gambar di sebelah kiri */}
          <img
            src="/gambar2.jpg" 
            className="object-cover w-full h-full"
            alt="Sign In"
          />
        </div>
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In to GajiKita</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Sign In
            </button>
            <p className="mt-4 text-center">
              Belum punya akun?{' '}
              <Link to="/" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
