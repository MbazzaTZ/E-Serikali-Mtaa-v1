import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-gray-900 dark:to-gray-800 border-t border-white/10 mt-16 pt-10 pb-6 overflow-hidden">
      {/* Watermark */}
      <img
        src="/src/assets/tz-coat.png"
        alt="Tanzania Coat of Arms"
        className="absolute inset-0 m-auto w-40 h-40 opacity-10 pointer-events-none select-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-800 dark:text-gray-200">
        {/* --- Column 1: Government Identity --- */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-primary">
            Jamhuri ya Muungano wa Tanzania
          </h3>
          <p className="text-sm leading-relaxed">
            Ofisi ya Rais – Tawala za Mikoa na Serikali za Mitaa (TAMISEMI)
            <br />
            Mfumo wa Huduma za Serikali Mtandao (Local Government e-Services).
          </p>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3">Viungo Muhimu</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.tamisemi.go.tz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
              >
                🌐 TAMISEMI Official Website
              </a>
            </li>
            <li>
              <a
                href="https://www.egov.go.tz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
              >
                🏛️ e-Government Authority (eGA)
              </a>
            </li>
            <li>
              <a
                href="https://www.nida.go.tz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
              >
                🆔 National ID Authority (NIDA)
              </a>
            </li>
            <li>
              <a
                href="https://www.immigration.go.tz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
              >
                🛂 Immigration Department
              </a>
            </li>
          </ul>
        </div>

        {/* --- Column 3: Contact & Social --- */}
        <div>
          <h4 className="text-lg font-semibold text-primary mb-3">Mawasiliano Rasmi</h4>
          <p className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-secondary" /> +255 26 2321500
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-secondary" /> info@tamisemi.go.tz
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-secondary" /> Ofisi za TAMISEMI, Dodoma – Tanzania
          </p>

          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com/tamisemi" target="_blank" className="hover:text-primary transition">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com/tamisemi_tz" target="_blank" className="hover:text-primary transition">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com/@tamisemi" target="_blank" className="hover:text-primary transition">
              <Youtube size={18} />
            </a>
            <a href="https://www.tamisemi.go.tz" target="_blank" className="hover:text-primary transition">
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-white/10 mt-10 pt-4 text-center text-xs text-gray-500 dark:text-gray-400 relative z-10">
        <p>
          © {new Date().getFullYear()} Serikali ya Jamhuri ya Muungano wa Tanzania — TAMISEMI e-Services Portal.
          <br />
          Designed & Developed by <span className="text-primary font-semibold">David Mbazza</span>.
        </p>
      </div>
    </footer>
  );
}
