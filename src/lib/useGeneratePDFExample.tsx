import { generateOfficialPDF } from "./useGeneratePDF";

export default function useGeneratePDFExample() {
  const handleGenerate = async () => {
    await generateOfficialPDF({
      title: "Demo PDF Example",
      fields: {
        Name: "John Doe",
        Service: "Resident Certificate",
        Date: new Date().toLocaleDateString(),
      },
      language: "sw",
    });
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold text-primary mb-4">PDF Generation Example</h1>
      <button
        onClick={handleGenerate}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
      >
        Generate PDF
      </button>
    </div>
  );
}
