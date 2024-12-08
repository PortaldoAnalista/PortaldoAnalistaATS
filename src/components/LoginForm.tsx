import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <img 
        src="https://www.atsinformatica.com.br/wp-content/uploads/2024/06/logo-ats-branca.svg" 
        alt="ATS Logo" 
        className="h-12 mb-8 invert"
      />
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#cf2e2e] text-white p-2 rounded-md hover:bg-[#270000] transition-colors"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => alert('Funcionalidade em desenvolvimento')}
          className="w-full text-[#cf2e2e] text-sm"
        >
          Esqueceu sua senha?
        </button>
      </form>
    </div>
  );
}