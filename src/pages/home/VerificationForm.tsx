import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function VerificationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    certificateNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.certificateNumber) {
      toast.error("Please complete all required fields.");
      return;
    }

    localStorage.setItem("verifiedUser", form.fullName);
    localStorage.setItem("userDetails", JSON.stringify(form));

    toast.success("Verification Successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex justify-center items-center p-6">
      <div className="glass-card p-8 w-full max-w-md space-y-6 animate-fade-scale">
        <div className="text-center">
          <img
            src="/src/assets/tz-coat.png"
            alt="Tanzania Coat of Arms"
            className="w-14 h-14 mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-primary">
            TAMISEMI e-Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            Enter your details below to verify your identity and access e-Services.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. David Mbazza"
              required
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+255..."
              required
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Physical Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Region / District / Ward"
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resident Certificate Number *
            </label>
            <input
              type="text"
              name="certificateNumber"
              value={form.certificateNumber}
              onChange={handleChange}
              placeholder="CT-2000-D-DAR-0000-0001"
              required
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition"
          >
            Verify & Continue
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center pt-2">
          © {new Date().getFullYear()} Government of the United Republic of Tanzania — TAMISEMI
        </p>
      </div>
    </div>
  );
}
