import { useState } from 'react';
import { getReasons, addReason, updateReason, deleteReason } from '../utils/storage';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ReasonManagement() {
  const [reasons, setReasons] = useState<string[]>(() => getReasons());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReason, setEditingReason] = useState<string | null>(null);
  const [formData, setFormData] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReason) {
      updateReason(editingReason, formData);
    } else {
      addReason(formData);
    }

    setReasons(getReasons());
    setIsModalOpen(false);
    setEditingReason(null);
    setFormData('');
  };

  const handleEdit = (reason: string) => {
    setEditingReason(reason);
    setFormData(reason);
    setIsModalOpen(true);
  };

  const handleDelete = (reason: string) => {
    if (window.confirm('Tem certeza que deseja excluir este motivo?')) {
      deleteReason(reason);
      setReasons(getReasons());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#270000]">Gerenciar Motivos</h1>
        <button
          onClick={() => {
            setEditingReason(null);
            setFormData('');
            setIsModalOpen(true);
          }}
          className="bg-[#cf2e2e] text-white px-4 py-2 rounded-md hover:bg-[#270000] transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Motivo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Motivo</th>
              <th className="text-right p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reasons.map((reason) => (
              <tr key={reason} className="border-b">
                <td className="p-4">{reason}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(reason)}
                    className="text-[#e99a89] hover:text-[#cf2e2e] mr-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(reason)}
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
          setEditingReason(null);
          setFormData('');
        }}
        title={editingReason ? 'Editar Motivo' : 'Novo Motivo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo</label>
            <input
              type="text"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingReason(null);
                setFormData('');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#cf2e2e] text-white rounded-md hover:bg-[#270000] transition-colors"
            >
              {editingReason ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}