import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header className="bg-[#cf2e2e] p-4 flex justify-between items-center">
      <img 
        src="https://www.atsinformatica.com.br/wp-content/uploads/2024/06/logo-ats-branca.svg" 
        alt="ATS Logo" 
        className="h-8"
      />
      <button
        onClick={handleLogout}
        className="text-white hover:text-[#e99a89] flex items-center gap-2"
      >
        <LogOut size={20} />
        Sair
      </button>
    </header>
  );
}