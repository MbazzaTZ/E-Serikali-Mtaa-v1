import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function UjenziPermitForm() {
  const [data, setData] = useState({
    applicantName: "",
    nin: "",
    phone: "",
    projectAddress: "",
    region: "",
    district: "",
    ward: "",
    plotNumber: "",
    buildingType: "",
    estimatedCost: "",
    startDate: "",
    completionDate: "",
    architectName: "",
    supportingDocs: null as File | null,
    declaration: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
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

    if (!data.applicantName || !data.projectAddress || !data.region) {
      toast.error("Please complete all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Building Permit Application Submitted!");
    setShowModal(true);
  };

  const downloadOfficialPermit = async () => {
    const fields = {
      "Applicant Name": data.applicantName,
      "NIN": data.nin,
      "Phone": data.phone,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
      "Project Address": data.projectAddress,
      "Plot Number": data.plotNumber,
      "Building Type": data.buildingType,
      "Estimated Construction Cost (TZS)": data.estimatedCost,
      "Start Date": data.startDate,
      "Expected Completion Date": data.completionDate,
      "Architect / Engineer": data.architectName,
    };

    await generateOfficialPDF({
      title: "Building Permit (Kibali cha Ujenzi)",
      fields,
      language: "sw",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      applicantName: "",
      nin: "",
      phone: "",
      projectAddress: "",
      region: "",
      district: "",
      ward: "",
      plotNumber: "",
      buildingType: "",
      estimatedCost: "",
      startDate: "",
      completionDate: "",
      architectName: "",
      supportingDocs: null,
      declaration: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Building Permit Application Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Construction Details" onSubmit={handleSubmit}>
        <input
          type="text"
          name="applicantName"
          placeholder="Applicant Full Name"
          value={data.applicantName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="nin"
          placeholder="National ID (NIN)"
          value={data.nin}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={data.phone}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="projectAddress"
          placeholder="Project Address"
          value={data.projectAddress}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={data.region}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
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
          name="plotNumber"
          placeholder="Plot / House Number"
          value={data.plotNumber}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="buildingType"
          placeholder="Building Type (Residential / Commercial / Institutional)"
          value={data.buildingType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="estimatedCost"
          placeholder="Estimated Cost (TZS)"
          value={data.estimatedCost}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={data.startDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/20"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Completion Date
            </label>
            <input
              type="date"
              name="completionDate"
              value={data.completionDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/20"
            />
          </div>
        </div>

        <input
          type="text"
          name="architectName"
          placeholder="Architect / Engineer Name"
          value={data.architectName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
          Upload Supporting Documents (Building Plan, Land Ownership, etc.):
        </label>
        <input
          type="file"
          name="supportingDocs"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 dark:text-gray-300"
          required
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
          Submit Application
        </button>
      </GlassForm>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-11/12 max-w-md text-center space-y-4 animate-fade-scale">
            <h3 className="text-2xl font-semibold text-primary">
              Application Submitted Successfully
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>{data.applicantName}</strong>, your Building Permit request has been received.
            </p>

            <button
              onClick={downloadOfficialPermit}
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
