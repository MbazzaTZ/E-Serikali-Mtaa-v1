import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function TransportationPermitForm() {
  const [data, setData] = useState({
    applicantName: "",
    companyName: "",
    vehicleType: "",
    vehicleRegNumber: "",
    driverName: "",
    driverLicense: "",
    transportType: "",
    cargoDescription: "",
    origin: "",
    destination: "",
    dateOfTransport: "",
    duration: "",
    region: "",
    district: "",
    ward: "",
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

    if (!data.applicantName || !data.vehicleRegNumber || !data.dateOfTransport) {
      toast.error("Please complete all required fields.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Transportation Permit Application Submitted!");
    setShowModal(true);
  };

  const downloadOfficialPermit = async () => {
    const fields = {
      "Applicant Name": data.applicantName,
      "Company Name": data.companyName,
      "Vehicle Type": data.vehicleType,
      "Vehicle Registration Number": data.vehicleRegNumber,
      "Driver Name": data.driverName,
      "Driver License Number": data.driverLicense,
      "Transport Type": data.transportType,
      "Cargo / Passenger Description": data.cargoDescription,
      "Origin": data.origin,
      "Destination": data.destination,
      "Date of Transport": data.dateOfTransport,
      "Duration": data.duration,
      "Region": data.region,
      "District": data.district,
      "Ward": data.ward,
    };

    await generateOfficialPDF({
      title: "Transportation Permit (Kibali cha Usafirishaji)",
      fields,
      language: "sw",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      applicantName: "",
      companyName: "",
      vehicleType: "",
      vehicleRegNumber: "",
      driverName: "",
      driverLicense: "",
      transportType: "",
      cargoDescription: "",
      origin: "",
      destination: "",
      dateOfTransport: "",
      duration: "",
      region: "",
      district: "",
      ward: "",
      supportingDocs: null,
      declaration: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Transportation Permit Application Form
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Transport Information" onSubmit={handleSubmit}>
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
          name="companyName"
          placeholder="Company Name (if applicable)"
          value={data.companyName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type (Truck, Bus, etc.)"
            value={data.vehicleType}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
          <input
            type="text"
            name="vehicleRegNumber"
            placeholder="Vehicle Registration Number"
            value={data.vehicleRegNumber}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="driverName"
            placeholder="Driver Full Name"
            value={data.driverName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
          <input
            type="text"
            name="driverLicense"
            placeholder="Driver License Number"
            value={data.driverLicense}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        <select
          name="transportType"
          value={data.transportType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        >
          <option value="">Select Transport Type</option>
          <option value="Cargo">Cargo Transport</option>
          <option value="Passenger">Passenger Transport</option>
          <option value="Special">Special / Hazardous Transport</option>
        </select>

        <textarea
          name="cargoDescription"
          placeholder="Describe Cargo / Passenger Details"
          value={data.cargoDescription}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20 min-h-[80px]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="origin"
            placeholder="Origin"
            value={data.origin}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={data.destination}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="dateOfTransport"
            value={data.dateOfTransport}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 1 Day, 3 Days)"
            value={data.duration}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white/10 border border-white/20"
          />
        </div>

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section B: Area of Operation
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

        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
          Upload Supporting Documents (Driver License, Insurance, Vehicle Registration, etc.):
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
              Transport permit for vehicle{" "}
              <strong>{data.vehicleRegNumber}</strong> has been recorded successfully.
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
