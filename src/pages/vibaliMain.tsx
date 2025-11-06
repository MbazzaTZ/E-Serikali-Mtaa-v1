import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  Cross,
  Music,
  Bus,
  Sprout,
  Trash2,
  Users,
} from "lucide-react";

export default function VibaliMain() {
  const permits = [
    {
      name: "Kibali cha Ujenzi",
      path: "/permits/ujenzi",
      icon: <Building2 className="w-10 h-10 text-primary" />,
      desc: "Ruhusa ya miradi ya ujenzi wa nyumba, ofisi au majengo ya biashara.",
    },
    {
      name: "Kibali cha Mazishi",
      path: "/permits/mazishi",
      icon: <Cross className="w-10 h-10 text-primary" />,
      desc: "Kibali rasmi cha mazishi kwa wakazi wa eneo husika.",
    },
    {
      name: "Kibali cha Matukio na Burudani",
      path: "/permits/matukio",
      icon: <Music className="w-10 h-10 text-primary" />,
      desc: "Ruhusa ya kufanya matamasha, sherehe, au matukio ya kijamii.",
    },
    {
      name: "Kibali cha Usafirishaji",
      path: "/permits/usafirishaji",
      icon: <Bus className="w-10 h-10 text-primary" />,
      desc: "Kibali cha kusafirisha mizigo, abiria, au bidhaa maalum.",
    },
    {
      name: "Kibali cha Kilimo na Umwagiliaji",
      path: "/permits/kilimo",
      icon: <Sprout className="w-10 h-10 text-primary" />,
      desc: "Ruhusa ya miradi ya kilimo na shughuli za umwagiliaji.",
    },
    {
      name: "Kibali cha Usafi na Mazingira",
      path: "/permits/usafi",
      icon: <Trash2 className="w-10 h-10 text-primary" />,
      desc: "Kibali cha kufanya kazi za usafi, taka na mazingira.",
    },
    {
      name: "Kibali cha Mikusanyiko na Mikutano",
      path: "/permits/mikusanyiko",
      icon: <Users className="w-10 h-10 text-primary" />,
      desc: "Kibali cha kufanya mikutano au mikusanyiko ya umma.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] to-[#e3f2fd] dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-primary mb-2">
          Huduma za Vibali vya Serikali za Mitaa
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Chagua aina ya kibali unachotaka kuomba kupitia mfumo wa e-Services.
        </p>
      </motion.div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {permits.map((permit, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition relative"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 rounded-full p-4">{permit.icon}</div>
              <h2 className="text-xl font-semibold text-primary">{permit.name}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">{permit.desc}</p>

              <Link
                to={permit.path}
                className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
              >
                Fungua Fomu
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link
          to="/dashboard"
          className="text-sm text-primary underline hover:text-secondary"
        >
          🔙 Rudi kwenye Dashibodi
        </Link>
      </motion.div>
    </div>
  );
}
