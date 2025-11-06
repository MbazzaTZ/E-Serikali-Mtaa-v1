import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function MikusanyikoMikutanoPermitForm() {
  const [data, setData] = useState({
    applicantName: "",
    organization: "",
    phone: "",
    email: "",
    eventTitle: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    expectedParticipants: "",
    purpose: "",
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

    if (!data.applicantName || !data.eventTitle || !data.date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Gathering & Meeting Permit Application Submitted!");
    setShowModal(true);
  };

  const downloadOfficialPermit = async () => {
    const fields = {
      "Applicant Name": data.applicantName,
      "Organization": data.organization,
      "Phone": data.phone,
      "Email": data.email,
      "Event Title": data.eventTitle,
      "Event Type": data.eventType,
      "Date": data.date,
      "Time": `${data.startTime} - ${data.endTime}`,
      "Venue": data.venue,
      "Expected Participants": data.expectedParticipants,
      "Purpose": data.purpose,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
      "Village": data.village,
    };

    await generateOfficialPDF({
      title: "Gatherings & Meetings Permit (Kibali cha Mikusanyiko na Mikutano)",
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
      eventTitle: "",
      eventType: "",
      date: "",
      startTime: "",
      endTime: "",
      venue: "",
      expectedParticipants: "",
      purpose: "",
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
        Gatherings & Meetings Permit Application Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Applicant & Event Details" onSubmit={handleSubmit}>
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
          placeholder="Organization / Group (if any)"
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
          name="eventTitle"
          placeholder="Event / Meeting Title"
          value={data.eventTitle}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />

        <select
          name="eventType"
          value={data.eventType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        >
          <option value="">Select Event Type</option>
          <option value="Public Meeting">Public Meeting</option>
          <option value="Private Function">Private Function</option>
          <option value="Religious Gathering">Religious Gathering</option>
          <option value="Political Meeting">Political Meeting</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
            required
          />
          <div className="flex gap-2">
            <input
              type="time"
              name="startTime"
              value={data.startTime}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/20"
            />
            <input
              type="time"
              name="endTime"
              value={data.endTime}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white/10 border border-white/20"
            />
          </div>
        </div>

        <input
          type="text"
          name="venue"
          placeholder="Venue / Location"
          value={data.venue}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <input
          type="text"
          name="expectedParticipants"
          placeholder="Expected Number of Participants"
          value={data.expectedParticipants}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <textarea
          name="purpose"
          placeholder="Purpose or Agenda of the Meeting"
          value={data.purpose}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20 min-h-[80px]"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section B: Location Information
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
          Upload Supporting Documents (Police Clearance, Approval Letters, etc.):
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
            I declare that all information provided is accurate and true to my knowledge.
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
              Permit for <strong>{data.eventTitle}</strong> has been recorded successfully.
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
