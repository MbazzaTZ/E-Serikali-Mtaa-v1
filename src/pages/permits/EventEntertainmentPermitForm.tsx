import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function EventEntertainmentPermitForm() {
  const [data, setData] = useState({
    organizerName: "",
    organization: "",
    phone: "",
    email: "",
    eventName: "",
    eventType: "",
    eventVenue: "",
    eventDate: "",
    eventDuration: "",
    expectedAttendance: "",
    purpose: "",
    region: "",
    district: "",
    ward: "",
    village: "",
    soundLevel: "",
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

    if (!data.eventName || !data.eventVenue || !data.eventDate) {
      toast.error("Please complete all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Event & Entertainment Permit Application Submitted!");
    setShowModal(true);
  };

  const downloadOfficialPermit = async () => {
    const fields = {
      "Organizer Name": data.organizerName,
      "Organization": data.organization,
      "Phone": data.phone,
      "Email": data.email,
      "Event Name": data.eventName,
      "Event Type": data.eventType,
      "Event Venue": data.eventVenue,
      "Event Date": data.eventDate,
      "Event Duration": data.eventDuration,
      "Expected Attendance": data.expectedAttendance,
      "Purpose / Description": data.purpose,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
      "Village": data.village,
      "Sound Level / Equipment": data.soundLevel,
    };

    await generateOfficialPDF({
      title: "Event & Entertainment Permit (Kibali cha Matukio na Burudani)",
      fields,
      language: "sw",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      organizerName: "",
      organization: "",
      phone: "",
      email: "",
      eventName: "",
      eventType: "",
      eventVenue: "",
      eventDate: "",
      eventDuration: "",
      expectedAttendance: "",
      purpose: "",
      region: "",
      district: "",
      ward: "",
      village: "",
      soundLevel: "",
      supportingDocs: null,
      declaration: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Event & Entertainment Permit Application Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Organizer & Event Information" onSubmit={handleSubmit}>
        <input
          type="text"
          name="organizerName"
          placeholder="Organizer Full Name"
          value={data.organizerName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />

        <input
          type="text"
          name="organization"
          placeholder="Organization / Company (optional)"
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
          name="eventName"
          placeholder="Event Name"
          value={data.eventName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="eventType"
          placeholder="Event Type (Concert, Wedding, Rally, etc.)"
          value={data.eventType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <input
          type="text"
          name="eventVenue"
          placeholder="Venue / Ground / Hall"
          value={data.eventVenue}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="eventDate"
            value={data.eventDate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
            required
          />
          <input
            type="text"
            name="eventDuration"
            placeholder="Duration (e.g. 2 Days, 6 Hours)"
            value={data.eventDuration}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        <input
          type="text"
          name="expectedAttendance"
          placeholder="Expected Number of Attendees"
          value={data.expectedAttendance}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <textarea
          name="purpose"
          placeholder="Purpose or Description of Event"
          value={data.purpose}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20 min-h-[80px]"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section B: Location & Logistics
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

        <input
          type="text"
          name="soundLevel"
          placeholder="Sound Level or Equipment Used (optional)"
          value={data.soundLevel}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
          Upload Supporting Documents (Venue Approval, Police Clearance, etc.):
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
            I hereby declare that the information provided is true and correct to the best of my
            knowledge.
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
              Event <strong>{data.eventName}</strong> has been recorded successfully.
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
