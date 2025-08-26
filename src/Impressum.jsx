
export default function Impressum() {
  return (
    <main className="p-6 flex justify-center ">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Imprint</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Officer in terms of data protection law</h2>
          <p className="text-gray-700 leading-relaxed">
            Carl von Ossietzky University of Oldenburg<br />
            Ammerländer Heerstraße 114-118 <br />
            26129 Oldenburg<br />
            Phone: 0441/7980<br />
            Email: infopoint@uol.de <br />
            Represented by its president: Prof. Dr. Ralph Bruder
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Protection Officer</h2>
          <p className="text-gray-700 leading-relaxed">
            Carl von Ossietzky University of Oldenburg <br />
            - The Data Protection Officer - <br />
            Ammerländer Heerstraße 114-118 <br />
            26129 Oldenburg <br />
            Phone: 0441/7984196 <br />
            Email: dsuni@uol.de <br />
            Website: https://uol.de/datenschutz
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Responsible for the master group project "Döner"</h2>
          <p className="text-gray-700 leading-relaxed">
              Prof. Dr. Philipp Staudt <br />
              Chair of Business Informatics – Environment & Sustainability <br />
              Carl von Ossietzky University of Oldenburg <br />
              Ammerländer Heerstraße 114-118 <br />
              26129 Oldenburg <br />
              Email: philipp.staudt@uni-oldenburg.de
          </p>
        </section>        
      </div>
    </main>
  );
};

