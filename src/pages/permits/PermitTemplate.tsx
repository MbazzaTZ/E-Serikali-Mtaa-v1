import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { useGeneratePDF } from "@/lib/useGeneratePDF";
import { toast } from "sonner";

export function PermitTemplate({ serviceName }: { serviceName: string }) {
  const { generateOfficialPDF } = useGeneratePDF();
  const [data, setData] = useState({
    fullName: "",
    nin: "",
    phone: "",
    region: "",
    ward: "",
    reason: "",
    startDate: "",
    endDate: "",
    address: "",
    documents: null as File | null,
    language: "English" as "English" | "Swahili",
    declaration: false,
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) setData((prev) => ({ ...prev, documents: files[0] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.declaration) return toast.error("Please confirm declaration.");
    if (!data.documents) return toast.error("Upload required document.");
    await fakeSubmit(data);
    toast.success(`${serviceName} application submitted.`);
    setShowModal(true);
  };

  const handleDownloadPDF = async () => {
    await generateOfficialPDF({
      applicantName: data.fullName,
      serviceName,
      language: data.language,
      region: data.region,
      ward: data.ward,
      details:
        data.language === "Swahili"
          ? `Hii ni kuthibitisha kuwa ${data.fullName} ameomba kibali cha "${serviceName}". Sababu: ${data.reason}. Kipindi: ${data.startDate} hadi ${data.endDate}. Eneo: ${data.address}, ${data.ward}, ${data.region}.`
          : `This certifies that ${data.fullName} has applied for a "${serviceName}" permit. Reason: ${data.reason}. Period: ${data.startDate} to ${data.endDate}. Location: ${data.address}, ${data.ward}, ${data.region}.`,
      qrInfo: `Permit: ${serviceName}\nApplicant: ${data.fullName}\nWard: ${data.ward}`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">{serviceName}</h2>
      <p className="text-center text-gray-600 dark:text-gray-300">(Official Local Government e-Service)</p>
      <GlassForm title="Permit Application Details" onSubmit={handleSubmit}>
        <select name="language" value={data.language} onChange={handleChange} className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3">
          <option value="English">English</option>
          <option value="Swahili">Kiswahili</option>
        </select>
        <input type="text" name="fullName" placeholder="Full Name" value={data.fullName} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        <input type="text" name="nin" placeholder="National ID (NIN)" value={data.nin} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        <input type="text" name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        <input type="text" name="region" placeholder="Region" value={data.region} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        <input type="text" name="ward" placeholder="Ward" value={data.ward} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        <input type="text" name="address" placeholder="Street / Village / Location" value={data.address} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        <textarea name="reason" placeholder="Reason for the Permit" value={data.reason} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20"></textarea>
        <div className="flex gap-3">
          <input type="date" name="startDate" value={data.startDate} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
          <input type="date" name="endDate" value={data.endDate} onChange={handleChange} required className="w-full p-2 rounded bg-white/10 border border-white/20" />
        </div>
        <h3 className="text-lg font-semibold text-secondary mt-6">Upload Required Document</h3>
        <input type="file" name="documents" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} required className="w-full text-sm text-gray-600 dark:text-gray-300" />
        <div className="flex items-start gap-2 mt-6">
          <input type="checkbox" name="declaration" checked={data.declaration} onChange={handleChange} className="w-4 h-4 accent-primary mt-1" />
          <label className="text-sm">I hereby confirm that all details are correct.</label>
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full mt-6">Submit Application</button>
      </GlassForm>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-11/12 max-w-md text-center space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Application Submitted</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {data.fullName}, your {serviceName} application was received successfully.
            </p>
            <button onClick={handleDownloadPDF} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full">Download Official PDF</button>
            <button onClick={() => setShowModal(false)} className="border border-gray-400 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 w-full mt-2">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
