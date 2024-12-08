import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from '../components/Header';
import AnalystManagement from './AnalystManagement';
import SupportManagement from './SupportManagement';
import ReasonManagement from './ReasonManagement';
import TicketManagement from './TicketManagement';
import Reports from './Reports';

export default function Dashboard() {
  const [currentUser] = useState(() => 
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            to="/dashboard/tickets"
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-[#270000] font-bold text-xl mb-2">Tickets</h2>
            <p className="text-gray-600">Gerenciar tickets de atendimento</p>
          </Link>

          {currentUser.role === 'master' && (
            <>
              <Link
                to="/dashboard/analysts"
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-[#270000] font-bold text-xl mb-2">Analistas</h2>
                <p className="text-gray-600">Gerenciar cadastro de analistas</p>
              </Link>

              <Link
                to="/dashboard/support"
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-[#270000] font-bold text-xl mb-2">Suporte</h2>
                <p className="text-gray-600">Gerenciar cadastro de suporte</p>
              </Link>

              <Link
                to="/dashboard/reasons"
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-[#270000] font-bold text-xl mb-2">Motivos</h2>
                <p className="text-gray-600">Gerenciar motivos de atendimento</p>
              </Link>
            </>
          )}

          <Link
            to="/dashboard/reports"
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-[#270000] font-bold text-xl mb-2">Relatórios</h2>
            <p className="text-gray-600">Visualizar e exportar relatórios</p>
          </Link>
        </div>

        <Routes>
          <Route path="analysts" element={<AnalystManagement />} />
          <Route path="support" element={<SupportManagement />} />
          <Route path="reasons" element={<ReasonManagement />} />
          <Route path="tickets" element={<TicketManagement />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}