import { useState } from "react";
import { GlassForm } from "@/components/ui/GlassForm";
import { fakeSubmit } from "@/lib/formHelpers";
import { toast } from "sonner";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

export default function ResidentCertificateForm() {
  const [data, setData] = useState({
    fullName: "",
    dob: "",
    nin: "",
    gender: "",
    phone: "",
    email: "",
    region: "",
    district: "",
    ward: "",
    street: "",
    houseNumber: "",
    duration: "",
    declaration: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [certificateNumber, setCertificateNumber] = useState("");

  const generateCertificateNumber = (dob: string, name: string, region: string) => {
    if (!dob || !name || !region) return "";
    const yearBorn = dob.split("-")[0] || "0000";
    const initial = name.trim().charAt(0).toUpperCase() || "X";
    const regionCode = region.trim().split(" ")[0].toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `CT-${yearBorn}-${initial}-${regionCode}-0000-${randomNum}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.declaration) {
      toast.error("Tafadhali thibitisha taarifa zako kabla ya kuwasilisha.");
      return;
    }

    const certNumber = generateCertificateNumber(data.dob, data.fullName, data.region);
    setCertificateNumber(certNumber);

    await fakeSubmit({ ...data, certificateNumber: certNumber });
    toast.success("Ombi la cheti limepokelewa!");
    setShowModal(true);
  };

  const handleDownloadPDF = async () => {
    const fields = {
      "Jina Kamili": data.fullName,
      "Tarehe ya Kuzaliwa": data.dob,
      "Namba ya NIDA": data.nin,
      "Jinsia": data.gender,
      "Simu": data.phone,
      "Barua Pepe": data.email,
      "Mkoa": data.region,
      "Wilaya": data.district,
      "Kata": data.ward,
      "Mtaa / Kijiji": data.street,
      "Nyumba Namba": data.houseNumber,
      "Muda wa Makazi": data.duration,
    };

    const bodyText = `
Kwa yeyote anayehusika / To Whom It May Concern:

Hii ni kuthibitisha kwamba Bw./Bi. ${data.fullName || "________________"} mwenye Namba ya NIDA ${
      data.nin || "________________"
    }, ni mkazi halali wa ${data.street || "________"}, Kata ya ${
      data.ward || "________"
    }, Wilaya ya ${data.district || "________"}, Mkoa wa ${
      data.region || "________"
    }.

Kulingana na rekodi zilizopo katika ofisi hii, amekuwa akiishi katika eneo hilo kwa kipindi cha ${
      data.duration || "________"
    }.

Cheti hiki kimetolewa kwa madhumuni ya utambulisho na uthibitisho wa makazi, na hakina uhusiano
wa moja kwa moja na masuala ya umiliki wa mali.

---------------------------------------------

This is to certify that Mr./Ms. ${data.fullName || "________________"}, holder of National ID No. ${
      data.nin || "________________"
    }, is a permanent resident of ${data.street || "________"}, Ward of ${
      data.ward || "________"
    }, District of ${data.district || "________"}, in the Region of ${
      data.region || "________"
    }.

Based on the official records, he/she has been residing in the mentioned area for a period of ${
      data.duration || "________"
    }.

This certificate is issued for identification and confirmation purposes only.
`;

    await generateOfficialPDF({
      title: "CHETI CHA UZAMILISHO / CERTIFICATE OF RESIDENCY",
      language: "sw",
      fields,
      certificateNumber,
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
      fullName: "",
      dob: "",
      nin: "",
      gender: "",
      phone: "",
      email: "",
      region: "",
      district: "",
      ward: "",
      street: "",
      houseNumber: "",
      duration: "",
      declaration: false,
    });
    setCertificateNumber("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary text-center">
        Cheti cha Uzamili / Certificate of Residency
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        (For Local Government e-Services Portal)
      </p>

      <GlassForm title="Maelezo ya Mwombaji / Applicant Information" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Jina Kamili / Full Name"
          value={data.fullName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="date"
          name="dob"
          value={data.dob}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
          required
        />
        <input
          type="text"
          name="nin"
          placeholder="Namba ya NIDA / National ID"
          value={data.nin}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        >
          <option value="">Chagua Jinsia / Select Gender</option>
          <option value="M">Mwanaume / Male</option>
          <option value="F">Mwanamke / Female</option>
          <option value="O">Nyingine / Other</option>
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Namba ya Simu / Phone Number"
          value={data.phone}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="email"
          name="email"
          placeholder="Barua Pepe / Email (optional)"
          value={data.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />

        <h3 className="text-lg font-semibold text-secondary mt-6">
          Maelezo ya Makazi / Residence Information
        </h3>
        <input
          type="text"
          name="region"
          placeholder="Mkoa / Region"
          value={data.region}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="district"
          placeholder="Wilaya / District"
          value={data.district}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="ward"
          placeholder="Kata / Ward"
          value={data.ward}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="street"
          placeholder="Mtaa / Kijiji / Street or Village"
          value={data.street}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <input
          type="text"
          name="houseNumber"
          placeholder="Nyumba Namba / House Number"
          value={data.houseNumber}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
        <select
          name="duration"
          value={data.duration}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        >
          <option value="">Muda wa Makazi / Duration of Stay</option>
          <option value="Chini ya mwaka mmoja">Less than 1 year</option>
          <option value="Miaka 1–3">1–3 years</option>
          <option value="Zaidi ya miaka 3">Over 3 years</option>
        </select>

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
            Ninatamka kuwa taarifa zote nilizojaza ni sahihi kwa uelewa wangu /
            I hereby declare that all information provided is true and correct.
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full mt-6"
        >
          Wasilisha Ombi / Submit Application
        </button>
      </GlassForm>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-11/12 max-w-md text-center space-y-4">
            <h3 className="text-2xl font-semibold text-primary">
              Ombi Limepokelewa / Application Submitted
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Cheti cha uzamili kwa <strong>{data.fullName}</strong> kimeandaliwa.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Namba ya Cheti / Certificate Number:
              <span className="block font-mono text-lg text-secondary mt-1">
                {certificateNumber}
              </span>
            </p>

            <button
              onClick={handleDownloadPDF}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition w-full"
            >
              Pakua Cheti (PDF) / Download Certificate
            </button>

            <button
              onClick={closeModal}
              className="border border-gray-400 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 w-full mt-2 transition"
            >
              Funga / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
