
export default function Impressum() {
  return (
    <main className="p-6 flex justify-center ">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Impressum</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Beauftragter im datenschutzrechtlichen Sinne</h2>
          <p className="text-gray-700 leading-relaxed">
            Carl von Ossietzky Universität Oldenburg<br />
            Ammerländer Heerstraße 114-118 <br />
            26129 Oldenburg<br />
            Telefon: 0441/7980<br />
            E-Mail: infopoint@uol.de <br />
            Vertreten durch Ihren Präsidenten: Prof. Dr. Ralph Bruder
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Datenschutzbeauftragter</h2>
          <p className="text-gray-700 leading-relaxed">
            Carl von Ossietzky Universität Oldenburg <br />
            - Der Datenschutzbeauftragte - <br />
            Ammerländer Heerstraße 114-118 <br />
            26129 Oldenburg <br />
            Telefon: 0441/ 7984196 <br />
            E-Mail: dsuni@uol.de <br />
            Internetauftritt: https://uol.de/datenschutz
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Verantwortlicher des Mastergruppenprojekts "Döner"</h2>
          <p className="text-gray-700 leading-relaxed">
              Prof. Dr. Philipp Staudt <br />
              Lehrstuhl für Wirtschaftsinformatik – Umwelt & Nachhaltigkeit <br />
              Carl von Ossietzky Universität Oldenburg <br />
              Ammerländer Heerstraße 114-118 <br />
              26129 Oldenburg <br />
              Mail: philipp.staudt@uni-oldenburg.de
          </p>
        </section>        
      </div>
    </main>
  );
};

