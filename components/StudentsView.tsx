
import React, { useState } from 'react';
import { Search, Plus, FileUp, Filter, MoreHorizontal, Eye, Edit2, Trash2, X } from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  level: string;
  program: 'Bachelors' | 'PGD' | 'Masters';
}

const initialStudents: StudentRecord[] = Array(12).fill(null).map((_, i) => ({
  id: 'U2020/2502201',
  name: 'Justice Amadi',
  email: 'justiceamadi@gmail.com',
  phone: '+2348012345678',
  department: 'Computer Science',
  level: '100',
  program: i === 1 ? 'PGD' : i === 2 ? 'Masters' : 'Bachelors'
}));

const ProgramBadge = ({ program }: { program: StudentRecord['program'] }) => {
  const styles = {
    'Bachelors': 'bg-[#4ade80] text-white',
    'PGD': 'bg-[#a3a3a3] text-white',
    'Masters': 'bg-[#93c5fd] text-white',
  };

  return (
    <span className={`px-4 py-1.5 rounded-lg text-[11px] font-bold inline-block min-w-[90px] text-center ${styles[program]}`}>
      {program}
    </span>
  );
};

const ActionMenu = () => {
  return (
    <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 text-slate-600 transition-colors border-b border-slate-50 text-left">
        <Eye className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-medium">View</span>
      </button>
      <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 text-slate-600 transition-colors border-b border-slate-50 text-left">
        <Edit2 className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-medium">Edit</span>
      </button>
      <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-red-500 transition-colors text-left">
        <Trash2 className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-medium">Delete</span>
      </button>
    </div>
  );
};

const StudentsView: React.FC = () => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">Students</h2>
        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white border border-blue-500 text-blue-500 px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-sm">
            <FileUp className="w-4 h-4" />
            <span className="hidden xs:inline">Upload CSV</span>
            <span className="xs:hidden">Upload</span>
          </button>
          <button className="flex-1 sm:flex-none bg-[#1b75d0] hover:bg-blue-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md">
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Add Students</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name, email..."
            className="w-full pl-4 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30 placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
        <div className="overflow-x-auto overflow-visible pb-10 -mb-10">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 md:p-6 w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-100 bg-white accent-blue-600 w-4 h-4 cursor-pointer transition-colors outline-none ring-0" />
                </th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Student ID</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Name</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Email</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Phone No</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Department</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Level</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest text-center whitespace-nowrap">Program</th>
                <th className="p-4 md:p-6 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {initialStudents.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-all duration-200 group relative">
                  <td className="p-4 md:p-6 text-center">
                    <input type="checkbox" className="rounded border-slate-100 bg-white accent-blue-600 w-4 h-4 cursor-pointer transition-colors outline-none ring-0" />
                  </td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-medium text-slate-400 tracking-tight whitespace-nowrap">{row.id}</td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-black text-slate-800 whitespace-nowrap">{row.name}</td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-medium text-slate-400 whitespace-nowrap">{row.email}</td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-medium text-slate-400 whitespace-nowrap">{row.phone}</td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-medium text-slate-600 whitespace-nowrap">{row.department}</td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-medium text-slate-600 whitespace-nowrap">{row.level}</td>
                  <td className="p-4 md:p-6 text-center whitespace-nowrap">
                    <ProgramBadge program={row.program} />
                  </td>
                  <td className="p-4 md:p-6 relative">
                    <button 
                      onClick={() => setActiveMenuIdx(activeMenuIdx === idx ? null : idx)}
                      className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-800"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {activeMenuIdx === idx && (
                      <ActionMenu />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsView;
