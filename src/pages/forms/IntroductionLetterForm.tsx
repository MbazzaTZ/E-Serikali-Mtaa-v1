import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function IntroductionLetterForm() {
  const [data, setData] = useState({
    applicantName: "",
    nida: "",
    dob: "",
    houseNumber: "",
    street: "",
    ward: "",
    district: "",
    region: "",
    recipientName: "",
    recipientAddress: "",
    purpose: "",
    declaration: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.declaration) {
      toast.error("Tafadhali thibitisha taarifa zako kabla ya kuwasilisha.");
      return;
    }

    await fakeSubmit(data);
    toast.success("Ombi la barua ya utambulisho limewasilishwa!");
    setShowModal(true);
  };

  const downloadLetterPDF = async () => {
    const fields = {
      "Jina Kamili": data.applicantName,
      "Namba ya NIDA": data.nida,
      "Tarehe ya Kuzaliwa": data.dob,
      "Nyumba Namba": data.houseNumber,
      "Mtaa / Kijiji": data.street,
      "Kata": data.ward,
      "Wilaya": data.district,
      "Mkoa": data.region,
      "Kwa": data.recipientName,
      "Anuani": data.recipientAddress,
    };

    const bodyText = `
Jina Kamili: ${data.applicantName || "______________________________"}
Namba ya NIDA: ${data.nida || "______________________________"}
Amezaliwa tarehe: ${data.dob || "____ / ____ / ______"}
Anaishi nyumba namba: ${data.houseNumber || "______________________________"}
Mtaa / Kijiji: ${data.street || "______________________________"}
Kata: ${data.ward || "______________________________"}
Wilaya: ${data.district || "______________________________"}
Mkoa: ${data.region || "______________________________"}

Mhusika tajwa hapo juu ni mkazi halali wa eneo hili na anajulikana vizuri na viongozi wa mtaa.
Kwa taarifa hizo, ofisi yangu haina pingamizi juu yake.
Hivyo basi, anaombwa atambuliwe rasmi na aruhusiwe kupata huduma au msaada anaouhitaji katika taasisi au ofisi husika.
`;

    await generateOfficialPDF({
      title: "Barua ya Utambulisho",
      fields,
      language: "sw",
      bodyText,
      signature: {
        officerTitle: "Afisa Mtendaji wa Kata / Mwenyekiti wa Mtaa",
        includeSeal: true,
        includeQRCode: true,
      },
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setData({
      applicantName: "",
      nida: "",
      dob: "",
      houseNumber: "",
      street: "",
      ward: "",
      district: "",
      region: "",
      recipientName: "",
      recipientAddress: "",
      purpose: "",
      declaration: false,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Barua ya Utambulisho (Introduction Letter)
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Section A: Maelezo ya Mwombaji" onSubmit={handleSubmit}>
        <input
          type="text"
          name="applicantName"
          placeholder="Jina Kamili"
          value={data.applicantName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="nida"
          placeholder="Namba ya NIDA"
          value={data.nida}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="date"
          name="dob"
          value={data.dob}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="houseNumber"
          placeholder="Nyumba Namba"
          value={data.houseNumber}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="street"
          placeholder="Mtaa / Kijiji"
          value={data.street}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="ward"
          placeholder="Kata"
          value={data.ward}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="district"
          placeholder="Wilaya"
          value={data.district}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="region"
          placeholder="Mkoa"
          value={data.region}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Section B: Taarifa za Anuani ya Kupokea Barua
        </h3>
        <input
          type="text"
          name="recipientName"
          placeholder="Kwa (Jina la Taasisi / Mtu)"
          value={data.recipientName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="recipientAddress"
          placeholder="Anuani / Maeneo"
          value={data.recipientAddress}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
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
            Ninatamka kuwa taarifa zote nilizojaza ni za kweli kwa uelewa wangu.
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full mt-6"
        >
          Wasilisha Ombi
        </button>
      </GlassForm>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-11/12 max-w-md text-center space-y-4 animate-fade-scale">
            <h3 className="text-2xl font-semibold text-primary">
              Ombi Lako Limepokelewa
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Barua ya utambulisho kwa{" "}
              <strong>{data.applicantName}</strong> imeandaliwa.
            </p>

            <button
              onClick={downloadLetterPDF}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full"
            >
              Pakua Barua (PDF)
            </button>

            <button
              onClick={closeModal}
              className="border border-gray-400 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 w-full mt-2 transition"
            >
              Funga
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
