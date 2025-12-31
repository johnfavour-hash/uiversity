import React, { useState } from "react";
import { MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import { AccountRecord } from "./types";
import { StatusBadge } from "./StatusBadge";

interface Props {
  data: AccountRecord[];
  onView: (admin: AccountRecord) => void;
  onEdit: (admin: AccountRecord) => void;
  onDelete: (id: string) => void;
}

export const AccountsTable = ({ data, onView, onEdit, onDelete }: Props) => {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-slate-100">
              <th className="p-6 text-slate-400 font-bold text-xs uppercase">
                Code
              </th>
              <th className="p-6 text-slate-400 font-bold text-xs uppercase">
                Role
              </th>
              <th className="p-6 text-slate-400 font-bold text-xs uppercase">
                Name
              </th>
              <th className="p-6 text-slate-400 font-bold text-xs uppercase">
                Email
              </th>
              <th className="p-6 text-slate-400 font-bold text-xs uppercase text-center">
                Status
              </th>
              <th className="p-6 text-slate-400 font-bold text-xs uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-all">
                <td className="p-6 text-xs font-black text-slate-800">
                  {row.code}
                </td>
                <td className="p-6 text-xs font-bold text-slate-600">
                  {row.role}
                </td>
                <td className="p-6 text-xs font-bold text-slate-900">
                  {row.name}
                </td>
                <td className="p-6 text-xs text-slate-400">{row.email}</td>
                <td className="p-6 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="p-6 relative">
                  <button
                    onClick={() =>
                      setActiveMenuIdx(activeMenuIdx === idx ? null : idx)
                    }
                    className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                  {activeMenuIdx === idx && (
                    <div className="absolute right-6 top-12 w-36 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <button
                        onClick={() => {
                          onView(row);
                          setActiveMenuIdx(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 text-slate-600 text-xs font-medium border-b border-slate-50"
                      >
                        <Eye className="w-4 h-4 text-slate-400" /> View
                      </button>
                      <button
                        onClick={() => {
                          onEdit(row);
                          setActiveMenuIdx(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 text-slate-600 text-xs font-medium border-b border-slate-50"
                      >
                        <Edit2 className="w-4 h-4 text-slate-400" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(row.code);
                          setActiveMenuIdx(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-red-500 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
