import { useState } from 'react';
import { Support } from '../types';
import { getSupports, addSupport, updateSupport, deleteSupport, getUsers } from '../utils/storage';
import Modal from '../components/Modal';
import { UserPlus, Edit, Trash2 } from 'lucide-react';

export default function SupportManagement() {
  const [supports, setSupports] = useState<Support[]>(() => getSupports());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupport, setEditingSupport] = useState<Support | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    analyst: '',
    team: '',
  });

  const analysts = getUsers().filter(user => user.role === 'analyst');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supportData: Support = {
      ...formData,
    };

    if (editingSupport) {
      updateSupport(editingSupport.username, supportData);
    } else {
      addSupport(supportData);
    }

    setSupports(getSupports());
    setIsModalOpen(false);
    setEditingSupport(null);
    setFormData({ username: '', analyst: '', team: '' });
  };

  const handleEdit = (support: Support) => {
    setEditingSupport(support);
    setFormData({
      username: support.username,
      analyst: support.analyst,
      team: support.team,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (username: string) => {
    if (window.confirm('Tem certeza que deseja excluir este suporte?')) {
      deleteSupport(username);
      setSupports(getSupports());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#270000]">Gerenciar Suporte</h1>
        <button
          onClick={() => {
            setEditingSupport(null);
            setFormData({ username: '', analyst: '', team: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#cf2e2e] text-white px-4 py-2 rounded-md hover:bg-[#270000] transition-colors flex items-center gap-2"
        >
          <UserPlus size={20} />
          Novo Suporte
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Usuário</th>
              <th className="text-left p-4">Analista Responsável</th>
              <th className="text-left p-4">Equipe</th>
              <th className="text-right p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {supports.map((support) => (
              <tr key={support.username} className="border-b">
                <td className="p-4">{support.username}</td>
                <td className="p-4">{support.analyst}</td>
                <td className="p-4">{support.team}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(support)}
                    className="text-[#e99a89] hover:text-[#cf2e2e] mr-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(support.username)}
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
          setEditingSupport(null);
          setFormData({ username: '', analyst: '', team: '' });
        }}
        title={editingSupport ? 'Editar Suporte' : 'Novo Suporte'}
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
            <label className="block text-sm font-medium text-gray-700">Analista Responsável</label>
            <select
              value={formData.analyst}
              onChange={(e) => setFormData({ ...formData, analyst: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            >
              <option value="">Selecione um analista</option>
              {analysts.map((analyst) => (
                <option key={analyst.email} value={analyst.username}>
                  {analyst.username}
                </option>
              ))}
            </select>
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
                setEditingSupport(null);
                setFormData({ username: '', analyst: '', team: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#cf2e2e] text-white rounded-md hover:bg-[#270000] transition-colors"
            >
              {editingSupport ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}