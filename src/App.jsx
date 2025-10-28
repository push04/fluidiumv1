import React from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import SimulationArea from './components/SimulationArea.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import GraphPanel from './components/GraphPanel.jsx';
import DataTable from './components/DataTable.jsx';
import TheoryTab from './components/TheoryTab.jsx';
import QuizModal from './components/QuizModal.jsx';
import Loader from './components/Loader.jsx';
import { useAppContext } from './context/AppContext.jsx';

export default function App(){
  const { isRunning } = useAppContext();
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto bg-background-light dark:bg-background-dark transition-colors">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <SimulationArea />
            <div className="space-y-4">
              <ControlPanel />
              <GraphPanel />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
            <DataTable />
            <TheoryTab />
          </div>
        </main>
      </div>
      <QuizModal />
      {!isRunning && <Loader />}
    </div>
  )
}
