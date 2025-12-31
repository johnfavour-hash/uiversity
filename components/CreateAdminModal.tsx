import React, { useState, useEffect } from "react";
import { X, Plus, Loader2, ChevronDown } from "lucide-react";
import api from "../api/axios";
import { AccountRecord, Faculty } from "./types";

export const CreateAdminModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (record: AccountRecord) => void;
}) => {
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [adminType, setAdminType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [fetchingFacs, setFetchingFacs] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    facultyId: "",
  });

  useEffect(() => {
    const getFaculties = async () => {
      setFetchingFacs(true);
      try {
        const res = await api.get("/faculties");
        setFaculties(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setFetchingFacs(false);
      }
    };
    getFaculties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (adminType === "Faculty Admin") {
        const response = await api.post(
          "/university-admin/faculty-admins",
          formData
        );
        const created = response.data.data.facultyAdmin;
        onSave({
          code: created.faculty.code || "N/A",
          role: "Faculty Admin",
          name: created.fullName,
          email: created.email,
          phone: formData.phone,
          status: "Active",
        });
        alert(`Admin created! Temp Password: ${created.tempPassword}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.response?.data?.message || "Failed to create"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-10 pt-10 pb-4 flex items-center justify-between">
          <h3 className="text-[#1b75d0] font-bold text-xl">
            {step === "choose" ? "Choose Admin Type" : `Add ${adminType}`}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-10 pb-10 overflow-y-auto">
          {step === "choose" ? (
            <div className="space-y-4">
              {["Department Admin", "Faculty Admin"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setAdminType(type);
                    setStep("form");
                  }}
                  className="w-full p-6 border border-slate-100 bg-slate-50/50 rounded-xl flex items-center gap-4 hover:border-blue-200 group transition-all"
                >
                  <Plus className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                  <span className="text-slate-500 font-bold group-hover:text-slate-800">
                    {type}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Phone"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <select
                  required
                  className="w-full px-4 py-2.5 border rounded-lg appearance-none"
                  value={formData.facultyId}
                  onChange={(e) =>
                    setFormData({ ...formData, facultyId: e.target.value })
                  }
                >
                  <option value="">
                    {fetchingFacs ? "Loading..." : "Select Faculty"}
                  </option>
                  {faculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep("choose")}
                  className="px-8 py-2 border rounded-md font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 bg-[#1b75d0] text-white rounded-md font-bold flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Admin"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
