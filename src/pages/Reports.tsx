import { useState } from 'react';
import { Ticket } from '../types';
import { getTickets, getUsers } from '../utils/storage';
import { Download, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAnalyst, setSelectedAnalyst] = useState('');
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(() => getTickets());

  const analysts = getUsers().filter(user => user.role === 'analyst');

  const handleFilter = () => {
    let tickets = getTickets();

    if (startDate) {
      tickets = tickets.filter(ticket => 
        new Date(ticket.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      tickets = tickets.filter(ticket => 
        new Date(ticket.date) <= new Date(endDate + 'T23:59:59')
      );
    }

    if (selectedAnalyst) {
      tickets = tickets.filter(ticket => 
        ticket.analyst === selectedAnalyst
      );
    }

    setFilteredTickets(tickets);
  };

  const handleExportExcel = () => {
    const data = filteredTickets.map(ticket => ({
      'Data': new Date(ticket.date).toLocaleDateString(),
      'Analista': ticket.analyst,
      'Suporte': ticket.support,
      'Motivo': ticket.reason,
      'Observação': ticket.observation
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
    
    // Generate file name with current date
    const fileName = `tickets_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#270000] mb-4">Relatórios</h1>
        
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Inicial
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Final
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Analista
              </label>
              <select
                value={selectedAnalyst}
                onChange={(e) => setSelectedAnalyst(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e99a89] focus:ring focus:ring-[#e99a89] focus:ring-opacity-50"
              >
                <option value="">Todos</option>
                {analysts.map((analyst) => (
                  <option key={analyst.email} value={analyst.username}>
                    {analyst.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={handleFilter}
                className="flex-1 bg-[#cf2e2e] text-white px-4 py-2 rounded-md hover:bg-[#270000] transition-colors flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Filtrar
              </button>
              <button
                onClick={handleExportExcel}
                className="flex-1 bg-[#270000] text-white px-4 py-2 rounded-md hover:bg-[#cf2e2e] transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Exportar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Data</th>
                <th className="text-left p-4">Analista</th>
                <th className="text-left p-4">Suporte</th>
                <th className="text-left p-4">Motivo</th>
                <th className="text-left p-4">Observação</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b">
                  <td className="p-4">{new Date(ticket.date).toLocaleDateString()}</td>
                  <td className="p-4">{ticket.analyst}</td>
                  <td className="p-4">{ticket.support}</td>
                  <td className="p-4">{ticket.reason}</td>
                  <td className="p-4">{ticket.observation}</td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    Nenhum ticket encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}