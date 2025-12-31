
import React, { useState } from 'react';
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  CreditCard, 
  ShieldCheck, 
  Megaphone, 
  Settings, 
  Search, 
  Bell, 
  History,
  ChevronDown,
  GraduationCap,
  MessageSquareText,
  Building2,
  Menu,
  X
} from 'lucide-react';
import ChatBot from './ChatBot';
import AccountsView from './AccountsView';
import StudentsView from './StudentsView';
import StaffView from './StaffView';
import PaymentsView from './PaymentsView';
import RolesPermissionsView from './RolesPermissionsView';
import AnnouncementsView from './AnnouncementsView';
import SettingsView from './SettingsView';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const SimpleLineChart = ({ data, color, height = 200, max = 100 }: { data: number[], color: string, height?: number, max?: number }) => {
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (val / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[0, 25, 50, 75, 100].map((v) => (
          <line key={v} x1="0" y1={v} x2="100" y2={v} stroke="#e2e8f0" strokeWidth="0.5" />
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

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showChat, setShowChat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Admin', icon: Building2 },
    { name: 'Staff', icon: Users },
    { name: 'Students', icon: GraduationCap },
    { name: 'Payments', icon: CreditCard },
    { name: 'Roles & Permissions', icon: ShieldCheck },
    { name: 'Announcements', icon: Megaphone },
    { name: 'Settings', icon: Settings },
  ];

  const handleNavClick = (name: string) => {
    setActiveTab(name);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    if (activeTab === 'Admin') return <AccountsView />;
    if (activeTab === 'Students') return <StudentsView />;
    if (activeTab === 'Staff') return <StaffView />;
    if (activeTab === 'Payments') return <PaymentsView />;
    if (activeTab === 'Roles & Permissions') return <RolesPermissionsView />;
    if (activeTab === 'Announcements') return <AnnouncementsView />;
    if (activeTab === 'Settings') return <SettingsView />;

    return (
      <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-[#fff7ed] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-orange-100 flex items-center gap-4 md:gap-6 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="p-3 md:p-4 bg-white/50 rounded-2xl">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 md:mb-1 uppercase tracking-wider">Total Students</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900">5,000</p>
            </div>
          </div>

          <div className="bg-[#f0fdf4] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100 flex items-center gap-4 md:gap-6 shadow-sm transition-transform hover:scale-[1.02]">
            <div className="p-3 md:p-4 bg-white/50 rounded-2xl">
              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 md:mb-1 uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900">N38M</p>
            </div>
          </div>

          <div className="bg-[#eff6ff] p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-blue-100 flex items-center gap-4 md:gap-6 shadow-sm transition-transform hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
            <div className="p-3 md:p-4 bg-white/50 rounded-2xl">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-slate-900" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-semibold text-slate-600 mb-0.5 md:mb-1 uppercase tracking-wider">Total Users</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900">100</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-wrap justify-between items-center mb-6 md:mb-10 gap-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900">Revenue Growth</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500">
                Today <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <SimpleLineChart data={[50, 25, 75, 80, 40, 70]} color="#22c55e" max={100} height={200} />
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900">Announcements</h3>
              <button 
                onClick={() => setActiveTab('Announcements')}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold whitespace-nowrap"
              >
                + New Note
              </button>
            </div>
            <div className="space-y-6">
              {[
                { title: 'Matriculation Date Released', date: '2025-01-03', text: 'The Math test scheduled for 21st January has been cancelled.' },
                { title: 'Field Trip Rescheduled', date: '2025-01-05', text: 'The field trip to London has been rescheduled. Check back for details.' },
                { title: 'About Mth 110 Test', date: '2025-01-02', text: 'The Math test scheduled for 23rd January has been cancelled.' }
              ].map((ann, i) => (
                <div key={i} className="pb-4 border-b border-slate-50 last:border-0 last:pb-0 group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{ann.title}</h4>
                    <span className="text-[8px] md:text-[10px] text-slate-400 font-semibold shrink-0 ml-2">{ann.date}</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed line-clamp-2">{ann.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-6 md:mb-10">Growth Rate</h3>
          <SimpleLineChart data={[500, 250, 750, 800, 400, 750]} color="#22c55e" max={1000} height={200} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-[110] 
        transition-transform duration-300 transform lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">uniedu</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.name 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="text-sm font-semibold">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-200 shrink-0 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button className="md:hidden p-2 text-slate-400">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('Announcements')}
                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <History className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={() => setActiveTab('Settings')}
              className="flex items-center gap-2 md:gap-3 border-l border-slate-200 pl-3 md:pl-6 group transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Uni Admin</p>
                <p className="text-[10px] text-slate-500 font-medium">uniadmin@uniedu.com</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                <UserSquare2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
           {renderContent()}
        </main>

        <button 
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-40 group"
        >
          {showChat ? <LogOut className="w-5 h-5 md:w-6 md:h-6 rotate-90" /> : <MessageSquareText className="w-5 h-5 md:w-6 md:h-6" />}
          <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
            {showChat ? 'Close Tutor' : 'Open AI Tutor'}
          </div>
        </button>

        {showChat && (
          <div className="fixed inset-0 md:inset-auto md:top-0 md:right-0 w-full md:w-[450px] h-full bg-white shadow-2xl z-[150] md:z-50 animate-in slide-in-from-right duration-300">
            <ChatBot onClose={() => setShowChat(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
