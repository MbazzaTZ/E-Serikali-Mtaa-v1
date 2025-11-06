import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function MazishiPermitForm() {
  const [data, setData] = useState({
    applicantName: "",
    applicantRelation: "",
    deceasedName: "",
    dateOfDeath: "",
    placeOfDeath: "",
    burialGround: "",
    reasonForBurial: "",
    region: "",
    district: "",
    ward: "",
    village: "",
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

    if (!data.deceasedName || !data.dateOfDeath || !data.burialGround) {
      toast.error("Please complete all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Burial Permit Application Submitted!");
    setShowModal(true);
  };

  const downloadOfficialPermit = async () => {
    const fields = {
      "Applicant Name": data.applicantName,
      "Relation to Deceased": data.applicantRelation,
      "Deceased Name": data.deceasedName,
      "Date of Death": data.dateOfDeath,
      "Place of Death": data.placeOfDeath,
      "Burial Ground": data.burialGround,
      "Reason for Burial": data.reasonForBurial,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
      "Village": data.village,
    };

    await generateOfficialPDF({
      title: "Burial Permit (Kibali cha Mazishi)",
      fields,
      language: "sw",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      applicantName: "",
      applicantRelation: "",
      deceasedName: "",
      dateOfDeath: "",
      placeOfDeath: "",
      burialGround: "",
      reasonForBurial: "",
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
        Burial Permit Application Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Deceased Information" onSubmit={handleSubmit}>
        <input
          type="text"
          name="deceasedName"
          placeholder="Full Name of Deceased"
          value={data.deceasedName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="date"
          name="dateOfDeath"
          value={data.dateOfDeath}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="placeOfDeath"
          placeholder="Place of Death"
          value={data.placeOfDeath}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section B: Applicant Information
        </h3>
        <input
          type="text"
          name="applicantName"
          placeholder="Applicant Full Name"
          value={data.applicantName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="applicantRelation"
          placeholder="Relation to Deceased (e.g., Son, Daughter, Relative)"
          value={data.applicantRelation}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section C: Burial Information
        </h3>
        <input
          type="text"
          name="burialGround"
          placeholder="Burial Ground / Cemetery Name"
          value={data.burialGround}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <textarea
          name="reasonForBurial"
          placeholder="Reason or Authorization for Burial"
          value={data.reasonForBurial}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20 min-h-[80px]"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section D: Location Details
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
          Upload Supporting Documents (Death Certificate / Hospital Letter):
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
              Burial permit for <strong>{data.deceasedName}</strong> has been recorded successfully.
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
