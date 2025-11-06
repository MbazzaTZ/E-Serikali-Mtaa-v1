import jsPDF from "jspdf";
import QRCode from "qrcode";

/**
 * Official Tanzanian PDF Generator
 * Includes header with Coat of Arms, watermark, bilingual footer, and standard body
 */
export async function generateOfficialPDF({
  title,
  fields,
  bodyText,
  language = "sw",
  certificateNumber,
  signature = {
    officerTitle: "Afisa Mtendaji wa Kata / Mwenyekiti wa Mtaa",
    includeSeal: true,
    includeQRCode: true,
  },
}: {
  title: string;
  fields?: Record<string, string>;
  bodyText?: string;
  language?: "sw" | "en";
  certificateNumber?: string;
  signature?: {
    officerTitle?: string;
    includeSeal?: boolean;
    includeQRCode?: boolean;
  };
}) {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const centerX = pageWidth / 2;
    const marginX = 60;

    // Load Coat of Arms logo
    const logoPath = "/src/assets/tz-coat.png";
    const logo = await fetch(logoPath)
      .then((res) => res.blob())
      .then((blob) => createImageBitmap(blob))
      .catch(() => null);

    // Add watermark (faded logo)
    if (logo) {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalAlpha = 0.05;
        ctx.drawImage(logo, 0, 0, 400, 400);
      }
      const watermarkData = canvas.toDataURL("image/png");
      pdf.addImage(watermarkData, "PNG", centerX - 200, pageHeight / 2 - 200, 400, 400);
    }

    // Add top Coat of Arms above header
    if (logo) {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(logo, 0, 0, 100, 100);
      const logoData = canvas.toDataURL("image/png");
      pdf.addImage(logoData, "PNG", centerX - 50, 20, 100, 100);
    }

    // Header Text
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("JAMHURI YA MUUNGANO WA TANZANIA", centerX, 145, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("UNITED REPUBLIC OF TANZANIA", centerX, 160, { align: "center" });

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text(
      "OFISI YA RAIS – TAWALA ZA MIKOA NA SERIKALI ZA MITAA (TAMISEMI)",
      centerX,
      180,
      { align: "center" }
    );
    pdf.text("HALMASHAURI YA MANISPAA YA ____________", centerX, 195, {
      align: "center",
    });
    pdf.text("OFISI YA MTENDAJI WA MTAA / KATA", centerX, 210, {
      align: "center",
    });

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text(title.toUpperCase(), centerX, 250, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.text("--------------------------------------------", centerX, 255, { align: "center" });

    // Body Content
    const startY = 290;
    pdf.setFont("times", "normal");
    pdf.setFontSize(11);

    const certificateBody =
      bodyText ||
      `Kwa yeyote anayehusika:

Hii ni kuthibitisha kwamba Bw./Bi. ______________________, mwenye Namba ya NIDA ______________________,
ni mkazi halali wa ______________________, Kata ya ______________________, Wilaya ya ______________________,
Mkoa wa ______________________.

Kulingana na rekodi zilizopo katika ofisi hii, amekuwa akiishi katika eneo hilo
kwa kipindi cha ______________________.

Cheti hiki kimetolewa kwa madhumuni ya utambulisho na uthibitisho wa makazi,
na hakina uhusiano wa moja kwa moja na masuala ya umiliki wa mali.`;

    const formattedText = pdf.splitTextToSize(certificateBody, pageWidth - marginX * 2);
    pdf.text(formattedText, marginX, startY);

    // Signature Section
    let sigY = pageHeight - 200;
    pdf.setFontSize(10);

    pdf.text("Imetolewa tarehe / Issued on: ___________________", marginX, sigY);
    sigY += 25;
    pdf.text("Imeandaliwa na / Prepared by: ____________________________", marginX, sigY);
    sigY += 25;
    pdf.text(`Cheo / Title: ${signature.officerTitle}`, marginX, sigY);
    sigY += 25;
    pdf.text("Saini / Signature: ____________________________", marginX, sigY);
    sigY += 25;

    if (signature.includeSeal) {
      pdf.text("Mhuri wa Ofisi / Official Seal:", marginX, sigY);
    }

    // QR Code (bottom-right)
    if (signature.includeQRCode && certificateNumber) {
      const qrText = `https://tamisemi.go.tz/verify/${certificateNumber}`;
      const qrData = await QRCode.toDataURL(qrText);
      const qrX = pageWidth - 140;
      pdf.addImage(qrData, "PNG", qrX, pageHeight - 200, 100, 100);
      pdf.setFontSize(8);
      pdf.text("Scan to Verify", qrX + 50, pageHeight - 90, { align: "center" });
    }

    // Footer
    const footerY = pageHeight - 40;
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    pdf.text(
      `© ${new Date().getFullYear()} - Government of the United Republic of Tanzania | TAMISEMI`,
      centerX,
      footerY,
      { align: "center" }
    );

    // Save PDF
    const fileName =
      certificateNumber || title.replace(/\s+/g, "_").toLowerCase() + ".pdf";
    pdf.save(fileName);
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}
