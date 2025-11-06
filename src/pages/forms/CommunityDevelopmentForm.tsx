import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function CommunityDevelopmentForm() {
  const [data, setData] = useState({
    projectName: "",
    projectType: "",
    projectLeader: "",
    contactNumber: "",
    region: "",
    district: "",
    ward: "",
    village: "",
    purpose: "",
    estimatedBudget: "",
    supportingDocs: null as File | null,
    declaration: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setData({ ...data, supportingDocs: files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.declaration) {
      toast.error("Please confirm the declaration before submitting.");
      return;
    }

    if (!data.projectName || !data.projectLeader || !data.purpose) {
      toast.error("Please fill in all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Community Development Request Submitted!");
    setShowModal(true);
  };

  const downloadOfficialReport = async () => {
    const fields = {
      "Project Name": data.projectName,
      "Project Type": data.projectType,
      "Project Leader": data.projectLeader,
      "Contact Number": data.contactNumber,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
      "Village": data.village,
      "Purpose / Description": data.purpose,
      "Estimated Budget": data.estimatedBudget,
    };

    await generateOfficialPDF({
      title: "Community Development Project Request (Mradi wa Maendeleo ya Jamii)",
      fields,
      language: "sw",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      projectName: "",
      projectType: "",
      projectLeader: "",
      contactNumber: "",
      region: "",
      district: "",
      ward: "",
      village: "",
      purpose: "",
      estimatedBudget: "",
      supportingDocs: null,
      declaration: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Community Development Request Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Project Information" onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={data.projectName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="projectType"
          placeholder="Project Type (e.g., Water, Education, Health)"
          value={data.projectType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="projectLeader"
          placeholder="Project Leader / Representative"
          value={data.projectLeader}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={data.contactNumber}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={data.region}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={data.district}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="ward"
          placeholder="Ward"
          value={data.ward}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="village"
          placeholder="Village / Street"
          value={data.village}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <textarea
          name="purpose"
          placeholder="Describe the project purpose and community impact..."
          value={data.purpose}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20 min-h-[100px]"
          required
        />

        <input
          type="text"
          name="estimatedBudget"
          placeholder="Estimated Budget (TZS)"
          value={data.estimatedBudget}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
          Upload Supporting Documents (if any):
        </label>
        <input
          type="file"
          name="supportingDocs"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 dark:text-gray-300"
        />

        <div className="flex items-start gap-2 mt-6">
          <input
            type="checkbox"
            name="declaration"
            checked={data.declaration}
            onChange={handleChange}
            className="w-4 h-4 accent-primary mt-1"
            required
          />
          <label className="text-sm leading-relaxed">
            I declare that all information provided is true and correct to the best of my knowledge.
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full mt-6"
        >
          Submit Request
        </button>
      </GlassForm>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-11/12 max-w-md text-center space-y-4 animate-fade-scale">
            <h3 className="text-2xl font-semibold text-primary">
              Request Submitted Successfully
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>{data.projectName}</strong> community project application has been received.
            </p>

            <button
              onClick={downloadOfficialReport}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full"
            >
              Download Official PDF
            </button>

            <button
              onClick={closeModal}
              className="border border-gray-400 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 w-full mt-2 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
