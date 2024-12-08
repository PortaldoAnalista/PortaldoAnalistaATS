import { useState } from 'react';
import { Ticket } from '../types';
import { getTickets, addTicket, updateTicket, deleteTicket, getSupports, getReasons } from '../utils/storage';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function TicketManagement() {
  const [tickets, setTickets] = useState<Ticket[]>(() => getTickets());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState({
    support: '',
    reason: '',
    observation: '',
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const supports = getSupports();
  const reasons = getReasons();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ticketData: Ticket = {
      id: editingTicket?.id || crypto.randomUUID(),
      date: editingTicket?.date || new Date().toISOString(),
      analyst: currentUser.username,
      ...formData,
    };

    if (editingTicket) {
      updateTicket(editingTicket.id, ticketData);
    } else {
      addTicket(ticketData);
    }

    setTickets(getTickets());
    setIsModalOpen(false);
    setEditingTicket(null);
    setFormData({ support: '', reason: '', observation: '' });
  };

  const handleEdit = (ticket: Ticket) => {
    if (ticket.analyst !== currentUser.username) {
      alert('Você só pode editar tickets criados por você.');
      return;
    }
    setEditingTicket(ticket);
    setFormData({
      support: ticket.support,
      reason: ticket.reason,
      observation: ticket.observation,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const ticket = tickets.find(t => t.id === id);
    if (ticket?.analyst !== currentUser.username) {
      alert('Você só pode excluir tickets criados por você.');
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir este ticket?')) {
      deleteTicket(id);
      setTickets(getTickets());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#270000]">Gerenciar Tickets</h1>
        <button
          onClick={() => {
            setEditingTicket(null);
            setFormData({ support: '', reason: '', observation: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#cf2e2e] text-white px-4 py-2 rounded-md hover:bg-[#270000] transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Novo Ticket
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Data</th>
              <th className="text-left p-4">Analista</th>
              <th className="text-left p-4">Suporte</th>
              <th className="text-left p-4">Motivo</th>
              <th className="text-left p-4">Observação</th>
              <th className="text-right p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b">
                <td className="p-4">{new Date(ticket.date).toLocaleDateString()}</td>
                <td className="p-4">{ticket.analyst}</td>
                <td className="p-4">{ticket.support}</td>
                <td className="p-4">{ticket.reason}</td>
                <td className="p-4">{ticket.observation}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="text-[#e99a89] hover:text-[#cf2e2e] mr-2"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
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
          setEditingTicket(null);
          setFormData({ support: '', reason: '', observation: '' });
        }}
        title={editingTicket ? 'Editar Ticket' : 'Novo Ticket'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Suporte</label>
            <select
              value={formData.support}
              onChange={(e) => setFormData({ ...formData, support: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            >
              <option value="">Selecione um suporte</option>
              {supports.map((support) => (
                <option key={support.username} value={support.username}>
                  {support.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo</label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              required
            >
              <option value="">Selecione um motivo</option>
              {reasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Observação</label>
            <textarea
              value={formData.observation}
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingTicket(null);
                setFormData({ support: '', reason: '', observation: '' });
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#cf2e2e] text-white rounded-md hover:bg-[#270000] transition-colors"
            >
              {editingTicket ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}