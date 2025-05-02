'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/products');
    } else {
      setError(data.message || 'Something went wrong');
    }
  }

  return (
    <div style={{display:'flex', flexDirection:'column', height: '100vh', justifyContent:'center',alignItems:'center',}}>
        <h2 style={{ textAlign: 'center' }}>Login Page</h2>
    <form onSubmit={handleSubmit}    style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          minWidth: '500px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="username" type='text' style={{padding:'10px',}}placeholder="Username" required />
      <input name="password" type="password" style={{padding:'10px',}} placeholder="Password" required />
      <button type="submit" style={{cursor:'pointer', color:'red'}}>Login</button>
    </form>
    </div>
  );
}
