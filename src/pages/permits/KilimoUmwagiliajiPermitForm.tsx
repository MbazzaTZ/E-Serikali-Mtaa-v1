import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function KilimoUmwagiliajiPermitForm() {
  const [data, setData] = useState({
    applicantName: "",
    organization: "",
    phone: "",
    email: "",
    projectName: "",
    projectType: "",
    cropType: "",
    farmLocation: "",
    areaSize: "",
    waterSource: "",
    irrigationType: "",
    startDate: "",
    expectedHarvest: "",
    region: "",
    district: "",
    ward: "",
    village: "",
    supportingDocs: null as File | null,
    declaration: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (!data.applicantName || !data.projectName || !data.cropType) {
      toast.error("Please complete all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Agriculture & Irrigation Permit Application Submitted!");
    setShowModal(true);
  };

  const downloadOfficialPermit = async () => {
    const fields = {
      "Applicant Name": data.applicantName,
      "Organization / Group": data.organization,
      "Phone": data.phone,
      "Email": data.email,
      "Project Name": data.projectName,
      "Project Type": data.projectType,
      "Crop Type": data.cropType,
      "Farm Location": data.farmLocation,
      "Farm Area Size (Hectares)": data.areaSize,
      "Water Source": data.waterSource,
      "Irrigation Type": data.irrigationType,
      "Start Date": data.startDate,
      "Expected Harvest Date": data.expectedHarvest,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
      "Village": data.village,
    };

    await generateOfficialPDF({
      title: "Agriculture & Irrigation Permit (Kibali cha Kilimo na Umwagiliaji)",
      fields,
      language: "sw",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      applicantName: "",
      organization: "",
      phone: "",
      email: "",
      projectName: "",
      projectType: "",
      cropType: "",
      farmLocation: "",
      areaSize: "",
      waterSource: "",
      irrigationType: "",
      startDate: "",
      expectedHarvest: "",
      region: "",
      district: "",
      ward: "",
      village: "",
      supportingDocs: null,
      declaration: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Agriculture & Irrigation Permit Application Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Project Information" onSubmit={handleSubmit}>
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
          name="organization"
          placeholder="Organization / Cooperative Name (if any)"
          value={data.organization}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={data.phone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={data.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
        </div>

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
          placeholder="Project Type (e.g., Crop Farming, Irrigation, Livestock)"
          value={data.projectType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="cropType"
          placeholder="Main Crop Type (e.g., Maize, Rice, Vegetables)"
          value={data.cropType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section B: Farm & Irrigation Details
        </h3>
        <input
          type="text"
          name="farmLocation"
          placeholder="Farm Location / Village"
          value={data.farmLocation}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="areaSize"
          placeholder="Farm Area Size (Hectares)"
          value={data.areaSize}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <input
          type="text"
          name="waterSource"
          placeholder="Water Source (River, Borehole, Rainwater, etc.)"
          value={data.waterSource}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="irrigationType"
          placeholder="Irrigation Type (Manual, Drip, Sprinkler)"
          value={data.irrigationType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
          <input
            type="date"
            name="expectedHarvest"
            value={data.expectedHarvest}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section C: Location Information
        </h3>
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

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
          Upload Supporting Documents (Land Ownership / Water Usage / Environmental Clearance):
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
              Agricultural project <strong>{data.projectName}</strong> has been recorded successfully.
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
