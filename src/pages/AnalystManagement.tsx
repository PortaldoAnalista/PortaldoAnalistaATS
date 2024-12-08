import { useState } from 'react';
import { User } from '../types';
import { getUsers, addUser, updateUser, deleteUser } from '../utils/storage';
import Modal from '../components/Modal';
import { UserPlus, Edit, Trash2 } from 'lucide-react';

export default function AnalystManagement() {
  const [analysts, setAnalysts] = useState<User[]>(() => 
    getUsers().filter(user => user.role === 'analyst')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnalyst, setEditingAnalyst] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    team: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const analystData: User = {
      ...formData,
      role: 'analyst',
    };

    if (editingAnalyst) {
      updateUser(editingAnalyst.email, analystData);
    } else {
      addUser(analystData);
    }

    setAnalysts(getUsers().filter(user => user.role === 'analyst'));
    setIsModalOpen(false);
    setEditingAnalyst(null);
    setFormData({ username: '', email: '', password: '', team: '' });
  };

  const handleEdit = (analyst: User) => {
    setEditingAnalyst(analyst);
    setFormData({
      username: analyst.username,
      email: analyst.email,
      password: analyst.password,
      team: analyst.team,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (email: string) => {
    if (window.confirm('Tem certeza que deseja excluir este analista?')) {
      deleteUser(email);
      setAnalysts(getUsers().filter(user => user.role === 'analyst'));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#270000]">Gerenciar Analistas</h1>
        <button
          onClick={() => {
            setEditingAnalyst(null);
            setFormData({ username: '', email: '', password: '', team: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#cf2e2e] text-white px-4 py-2 rounded-md hover:bg-[#270000] transition-colors flex items-center gap-2"
        >
          <UserPlus size={20} />
          Novo Analista
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Usuário</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Equipe</th>
              <th className="text-right p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {analysts.map((analyst) => (
              <tr key={analyst.email} className="border-b">
                <td className="p-4">{analyst.username}</td>
                <td className="p-4">{analyst.email}</td>
                <td className="p-4">{analyst.team}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(analyst)}
                    className="text-[#e99a89] hover:text-[#cf2e2e] mr-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(analyst.email)}
                    className="text-[#e99a89] hover:text-[#cf2e2e]"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAnalyst(null);
          setFormData({ username: '', email: '', password: '', team: '' });
        }}
        title={editingAnalyst ? 'Editar Analista' : 'Novo Analista'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuário</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Equipe</label>
            <input
              type="text"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingAnalyst(null);
                setFormData({ username: '', email: '', password: '', team: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#cf2e2e] text-white rounded-md hover:bg-[#270000] transition-colors"
            >
              {editingAnalyst ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}