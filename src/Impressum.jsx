
export default function Impressum() {
  return (
    <main className="p-6 flex justify-center ">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Impressum</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Angaben gemäß § 5 TMG</h2>
          <p className="text-gray-700 leading-relaxed">
            Max Mustermann<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Kontakt</h2>
          <p className="text-gray-700 leading-relaxed">
            Telefon: 01234 567890<br />
            E-Mail: <a href="mailto:max@mustermann.de" className="text-blue-600 hover:underline">max@mustermann.de</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p className="text-gray-700 leading-relaxed">
            Max Mustermann<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
        </section>

        
      </div>
    </main>
  );
};

