import { useState } from "react";
import { useGeneratePDF } from "@/lib/useGeneratePDF";
import { GlassForm } from "@/components/ui/GlassForm";

export default function UseGeneratePDFExample() {
  const { generateOfficialPDF } = useGeneratePDF();
  const [form, setForm] = useState({
    applicantName: "",
    region: "",
    ward: "",
    language: "English" as "English" | "Swahili",
    serviceName: "Demo Service",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateOfficialPDF({
      applicantName: form.applicantName,
      region: form.region,
      ward: form.ward,
      serviceName: form.serviceName,
      language: form.language,
      details: form.details || "This is a test of the unified Tanzania e-Government PDF generator.",
      qrInfo: "Demo verification QR test for PDF generator",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary text-center mb-2">
        PDF Generator Demo
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        (Test your unified official government PDF engine)
      </p>

      <GlassForm title="PDF Demo Input" onSubmit={handleGenerate}>
        <input
          type="text"
          name="applicantName"
          placeholder="Full Name"
          value={form.applicantName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <input
          type="text"
          name="region"
          placeholder="Region"
          value={form.region}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <input
          type="text"
          name="ward"
          placeholder="Ward"
          value={form.ward}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        >
          <option value="English">English</option>
          <option value="Swahili">Kiswahili</option>
        </select>

        <input
          type="text"
          name="serviceName"
          placeholder="Service Name (e.g. Resident Certificate)"
          value={form.serviceName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <textarea
          name="details"
          placeholder="Custom Message / Details for PDF body"
          value={form.details}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full mt-6"
        >
          Generate Official PDF
        </button>
      </GlassForm>
    </div>
  );
}
