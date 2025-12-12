import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});



    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      nav('/admin'); // redirect to dashboard
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
