export default function Datenschutz(){
      return (
    <main className="p-6 flex justify-center mb-2">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Datenschutzerklärung</h1>
          <p className="text-gray-700 leading-relaxed">
            Der Schutz Ihrer persönlichen Daten hat für die Stadt Bad Oeynhausen oberste Priorität. 
            Dieses Prinzip gilt für unser Internetangebot ebenso wie für unsere konventionellen Dienstleistungen.


          </p>


        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Verantwortliche Stelle</h2>
          <p className="text-gray-700 leading-relaxed">
            Max Mustermann<br />
            Musterstraße 1<br />
            12345 Musterstadt<br />
            E-Mail: <a href="mailto:max@mustermann.de" className="text-blue-600 hover:underline">max@mustermann.de</a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Zweck der Verarbeitung</h2>
          <p className="text-gray-700 leading-relaxed">
            Die Webanwendung dient der datenbankkonformen Aufbereitung von CSV-Dateien mit personenbezogenen Inhalten.
            Der Zugriff erfolgt über einen geschützten Login-Bereich und ist ausschließlich für autorisierte Mitarbeitende
            der Stadtverwaltung vorgesehen.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Verarbeitete Daten</h2>
          <p className="text-gray-700 leading-relaxed">
            Es werden folgende Daten verarbeitet:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2">
            <li>Login-Daten (z. B. Name, E-Mail-Adresse, Passwort-Hash)</li>
            <li>CSV-Dateien mit möglicherweise personenbezogenen Informationen</li>
            <li>Server-Logs (IP-Adresse, Zugriffszeitpunkte etc.)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Speicherung und Zugriff</h2>
          <p className="text-gray-700 leading-relaxed">
            Die hochgeladenen Daten werden serverseitig gespeichert, um den fortlaufenden Zugriff durch
            autorisierte Nutzer:innen zu ermöglichen. Die genaue Speicherdauer richtet sich nach den Anforderungen
            der Stadtverwaltung. Eine automatische Löschung erfolgt derzeit nicht.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Hosting und Datenweitergabe</h2>
          <p className="text-gray-700 leading-relaxed">
            Die Anwendung wird auf Servern eines externen Hosting-Anbieters betrieben. Der konkrete Anbieter wird
            in Abstimmung mit der Stadtverwaltung festgelegt. Es kann daher zu einer Übermittlung personenbezogener
            Daten an diesen Dienstleister kommen. Eine Verarbeitung erfolgt ausschließlich gemäß Art. 28 DSGVO.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Keine Verantwortung für externe Plattformen</h2>
          <p className="text-gray-700 leading-relaxed">
            Wir stehen in keiner geschäftlichen Beziehung zur Plattform Metabase. Die Übertragung von Daten aus unserer
            Anwendung in externe Systeme erfolgt eigenverantwortlich durch die Nutzer:innen. Für die Speicherung,
            Verarbeitung oder Darstellung der Daten in Metabase übernehmen wir keine Haftung.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">7. Rechtsgrundlagen</h2>
          <p className="text-gray-700 leading-relaxed">
            Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung gegenüber
            der Stadtverwaltung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer Datenverarbeitung).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">8. Rechte der betroffenen Personen</h2>
          <p className="text-gray-700 leading-relaxed">
            Betroffene Personen haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit sowie Widerspruch. Zudem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">9. Kontakt bei Datenschutzfragen</h2>
          <p className="text-gray-700 leading-relaxed">
            Bei Fragen oder Anliegen zum Datenschutz wenden Sie sich bitte an:<br />
            E-Mail: <a href="mailto:max@mustermann.de" className="text-blue-600 hover:underline">max@mustermann.de</a>
          </p>
        </section>
      </div>
    </main>
  );
};
