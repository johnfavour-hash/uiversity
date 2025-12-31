// import React, { useState } from 'react';
// import { Search, Plus, MoreHorizontal, X, ChevronLeft, Eye, Edit2, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
// import api from '../api/axios'; // Ensure this path points to your axios.ts file

// interface AccountRecord {
//   code: string;
//   role: string;
//   name: string;
//   email: string;
//   phone: string;
//   status: 'Active' | 'Not Active' | 'Pending' | 'Not Certified' | 'Certified';
// }

// const initialAccountsData: AccountRecord[] = [
//   { code: 'FOH', role: 'Faculty Admin', name: 'Dr. Sarah Johnson', email: 'sarah@test.com', phone: '08098765432', status: 'Active' },
// ];

// const StatusBadge = ({ status }: { status: AccountRecord['status'] }) => {
//   const styles = {
//     'Active': 'bg-[#4ade80] text-white',
//     'Certified': 'bg-[#4ade80] text-white',
//     'Not Active': 'bg-[#94a3b8] text-white',
//     'Not Certified': 'bg-[#94a3b8] text-white',
//     'Pending': 'bg-[#fbbf24] text-white',
//   };

//   return (
//     <span className={`px-4 py-1.5 rounded-lg text-[10px] md:text-[11px] font-bold inline-block min-w-[90px] md:min-w-[100px] text-center ${styles[status]}`}>
//       {status}
//     </span>
//   );
// };

// const CreateAdminModal = ({ onClose, onSave }: { onClose: () => void, onSave: (record: AccountRecord) => void }) => {
//   const [step, setStep] = useState<'choose' | 'form'>('choose');
//   const [adminType, setAdminType] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     facultyId: '', // For Faculty Admin
//   });

//   const handleSelectType = (type: string) => {
//     setAdminType(type);
//     setStep('form');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (adminType === 'Faculty Admin') {
//         const payload = {
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           facultyId: formData.facultyId,
//         };

//         // 1. POST Request to your endpoint
//         const response = await api.post("/university-admin/faculty-admins", payload);

//         // 2. Extract data from your specific response structure
//         const createdAdmin = response.data.data.facultyAdmin;

//         // 3. Map backend response to UI Table structure
//         const newRecord: AccountRecord = {
//           code: createdAdmin.faculty.code || 'N/A',
//           role: 'Faculty Admin',
//           name: createdAdmin.fullName,
//           email: createdAdmin.email,
//           phone: formData.phone,
//           status: 'Active'
//         };

//         onSave(newRecord);
//         alert(`Admin created! Temp Password: ${createdAdmin.tempPassword}`);
//       } else {
//         // Placeholder for Department Admin logic
//         alert("Department Admin logic not implemented yet");
//       }
//     } catch (error: any) {
//       console.error("Creation Error:", error);
//       const errorMsg = error.response?.data?.message || "Failed to create admin. Check console for details.";
//       alert(`Error: ${errorMsg}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl md:rounded-[1rem] w-full max-w-xl relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
//         <div className="px-6 md:px-10 pt-6 md:pt-10 pb-4 flex items-center justify-between shrink-0">
//           <h3 className="text-[#1b75d0] font-bold text-lg md:text-xl">
//             {step === 'choose' ? 'Choose Admin Type' : `Add ${adminType}`}
//           </h3>
//           <button onClick={onClose} className="p-1.5 text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="px-6 md:px-10 pb-6 md:pb-10 overflow-y-auto">
//           {step === 'choose' ? (
//             <div className="animate-in slide-in-from-bottom-4 duration-300">
//               <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-10">Select the type of administrator account you wish to create</p>
//               <div className="space-y-3 md:space-y-4">
//                 <button onClick={() => handleSelectType('Department Admin')} className="w-full p-6 md:p-8 border border-slate-100 bg-slate-50/50 rounded-xl md:rounded-2xl flex items-center justify-center gap-4 hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
//                   <Plus className="w-5 h-5 md:w-6 md:h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
//                   <span className="text-slate-500 font-bold text-base md:text-lg group-hover:text-slate-800 transition-colors">Department Admin</span>
//                 </button>
//                 <button onClick={() => handleSelectType('Faculty Admin')} className="w-full p-6 md:p-8 border border-slate-100 bg-slate-50/50 rounded-xl md:rounded-2xl flex items-center justify-center gap-4 hover:border-blue-200 hover:bg-blue-50/50 transition-all group">
//                   <Plus className="w-5 h-5 md:w-6 md:h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
//                   <span className="text-slate-500 font-bold text-base md:text-lg group-hover:text-slate-800 transition-colors">Faculty Admin</span>
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 mt-2 md:mt-4">
//               <div className="space-y-1 md:space-y-2">
//                 <label className="text-xs md:text-sm font-bold text-slate-800">Full Name <span className="text-orange-600">*</span></label>
//                 <input
//                   type="text" required placeholder="Dr. Sara Johnson"
//                   className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-1 md:space-y-2">
//                 <label className="text-xs md:text-sm font-bold text-slate-800">Official Email <span className="text-orange-600">*</span></label>
//                 <input
//                   type="email" required placeholder="sarah.uams.test"
//                   className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-1 md:space-y-2">
//                 <label className="text-xs md:text-sm font-bold text-slate-800">Phone Number <span className="text-orange-600">*</span></label>
//                 <input
//                   type="text" required placeholder="08098765432"
//                   className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-1 md:space-y-2">
//                 <label className="text-xs md:text-sm font-bold text-slate-800">Faculty ID (UUID) <span className="text-orange-600">*</span></label>
//                 <input
//                   type="text" required placeholder="cae64bdc-0b8c-409f-8b91-7fcface06cc4"
//                   className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm"
//                   value={formData.facultyId}
//                   onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
//                 />
//               </div>

//               <div className="flex flex-col-reverse xs:flex-row justify-end items-stretch gap-3 pt-4">
//                 <button type="button" onClick={() => setStep('choose')} className="px-8 py-2.5 border border-slate-400 rounded-md text-slate-700 font-bold text-sm">
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-2.5 bg-[#1b75d0] hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all text-sm flex items-center justify-center gap-2"
//                 >
//                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Admin'}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const AccountsView: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [accounts, setAccounts] = useState<AccountRecord[]>(initialAccountsData);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);

//   const handleSaveAdmin = (newRecord: AccountRecord) => {
//     setAccounts([newRecord, ...accounts]);
//     setIsModalOpen(false);
//   };

//   const filteredAccounts = accounts.filter(acc =>
//     acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     acc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     acc.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-4 md:space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h2 className="text-xl md:text-2xl font-bold text-slate-800">Admin</h2>
//         <div className="flex items-center gap-4 w-full sm:w-auto">
//           <div className="relative flex-1 sm:w-80">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="text" placeholder="Search accounts..."
//               className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-[#1b75d0] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md"
//           >
//             <Plus className="w-4 h-4" /> Create Admin
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[900px]">
//             <thead className="bg-slate-50/50">
//               <tr className="border-b border-slate-100">
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase">Code</th>
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase">Role</th>
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase">Name</th>
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase">Email</th>
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase">Phone</th>
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase text-center">Status</th>
//                 <th className="p-6 text-slate-400 font-bold text-xs uppercase">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredAccounts.map((row, idx) => (
//                 <tr key={idx} className="hover:bg-slate-50 transition-all">
//                   <td className="p-6 text-xs font-black text-slate-800">{row.code}</td>
//                   <td className="p-6 text-xs font-bold text-slate-600">{row.role}</td>
//                   <td className="p-6 text-xs font-bold text-slate-900">{row.name}</td>
//                   <td className="p-6 text-xs text-slate-400">{row.email}</td>
//                   <td className="p-6 text-xs text-slate-400">{row.phone}</td>
//                   <td className="p-6 text-center"><StatusBadge status={row.status} /></td>
//                   <td className="p-6">
//                     <button className="p-2 hover:bg-slate-200 rounded-xl"><MoreHorizontal className="w-5 h-5" /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isModalOpen && (
//         <CreateAdminModal onClose={() => setIsModalOpen(false)} onSave={handleSaveAdmin} />
//       )}
//     </div>
//   );
// };

// export default AccountsView;

import React, { useState, useEffect } from "react";
import { Users, CreditCard, ShieldCheck, ChevronDown } from "lucide-react";
import api from "../api/axios"; // Make sure this points to your axios instance

const SimpleLineChart = ({
  data,
  color,
  height = 200,
  max = 100,
}: {
  data: number[];
  color: string;
  height?: number;
  max?: number;
}) => {
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (val / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {[0, 25, 50, 75, 100].map((v) => (
          <line
            key={v}
            x1="0"
            y1={v}
            x2="100"
            y2={v}
            stroke="#e2e8f0"
            strokeWidth="0.5"
          />
        ))}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
        <span>2024</span>
        <span>2025</span>
        <span>2026</span>
        <span>2027</span>
        <span>2028</span>
        <span>2029</span>
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => {
  // 1. Create state for student count and loading status
  const [studentCount, setStudentCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 2. Fetch data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Since your baseURL is http://localhost:3001/api, we just need /students
        // const response = await api.get("/students/");
        const response = await api.get("/students");
        console.log("Full Response Object:", response);
        console.log("Response Body:", response.data);

        // If your API wraps the array in a 'data' property, it would be:
        if (response.data && Array.isArray(response.data.data)) {
          setStudentCount(response.data.data.length);
        } else if (Array.isArray(response.data)) {
          setStudentCount(response.data.length);
        }
        // The endpoint returns an array, so we get the .length
        if (Array.isArray(response.data)) {
          setStudentCount(response.data.length);
        }
      } catch (error) {
        console.log("BACKEND ERROR MESSAGE:", error.response?.data);
        console.error("Error fetching students for dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Total Students Card */}
        <div className="bg-[#fff7ed] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-orange-100 flex items-center gap-4 md:gap-6 shadow-sm transition-transform hover:scale-[1.02]">
          <div className="p-3 md:p-4 bg-white/50 rounded-2xl">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 md:mb-1 uppercase tracking-wider">
              Total Students
            </p>
            {/* 3. Replace static 5,000 with dynamic count */}
            <p className="text-2xl md:text-3xl font-black text-slate-900">
              {isLoading ? "..." : studentCount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-[#f0fdf4] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100 flex items-center gap-4 md:gap-6 shadow-sm transition-transform hover:scale-[1.02]">
          <div className="p-3 md:p-4 bg-white/50 rounded-2xl">
            <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 md:mb-1 uppercase tracking-wider">
              Total Revenue
            </p>
            <p className="text-2xl md:text-3xl font-black text-slate-900">
              N38M
            </p>
          </div>
        </div>

        <div className="bg-[#eff6ff] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-blue-100 flex items-center gap-4 md:gap-6 shadow-sm transition-transform hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
          <div className="p-3 md:p-4 bg-white/50 rounded-2xl">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 md:mb-1 uppercase tracking-wider">
              Total Users
            </p>
            <p className="text-2xl md:text-3xl font-black text-slate-900">
              100
            </p>
          </div>
        </div>
      </div>

      {/* ... rest of your charts and announcements code remains the same ... */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap justify-between items-center mb-6 md:mb-10 gap-4">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Revenue Growth
            </h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500">
              Today <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <SimpleLineChart
            data={[50, 25, 75, 80, 40, 70]}
            color="#22c55e"
            max={100}
            height={200}
          />
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Announcements
            </h3>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold whitespace-nowrap">
              + New Note
            </button>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Matriculation Date Released",
                date: "2025-01-03",
                text: "The Math test scheduled for 21st January has been cancelled.",
              },
              {
                title: "Field Trip Rescheduled",
                date: "2025-01-05",
                text: "The field trip to London has been rescheduled. Check back for details.",
              },
              {
                title: "About Mth 110 Test",
                date: "2025-01-02",
                text: "The Math test scheduled for 23rd January has been cancelled.",
              },
            ].map((ann, i) => (
              <div
                key={i}
                className="pb-4 border-b border-slate-50 last:border-0 last:pb-0 group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {ann.title}
                  </h4>
                  <span className="text-[8px] md:text-[10px] text-slate-400 font-semibold shrink-0 ml-2">
                    {ann.date}
                  </span>
                </div>
                <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {ann.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-6 md:mb-10">
          Growth Rate
        </h3>
        <SimpleLineChart
          data={[500, 250, 750, 800, 400, 750]}
          color="#22c55e"
          max={1000}
          height={200}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
