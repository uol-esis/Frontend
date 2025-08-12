export default function Datenschutz() {
  return (
    <main className="p-6 flex justify-center mb-2">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Datenschutzerklärung</h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Der Schutz Ihrer persönlichen Daten hat oberste Priorität. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten in unserer Webanwendung.
          Dabei übernimmt Th1nk keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen, dies obliegt der Stadtverwaltung.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Personenbezogene Daten</h2>
          <p className="text-gray-700 leading-relaxed">
            Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.
            Als identifizierbar wird eine Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen etc., identifiziert werden kann.
            Ihre Daten werden durch eine Verschlüsselung nach dem Stand der Technik sicher übertragen.
            Eine Weitergabe an Dritte erfolgt nicht ohne Ihre Einwilligung.
            Erhebungen von personenbezogenen Daten sowie deren Übermittlung an auskunftsberechtigte staatliche Institutionen und Behörden erfolgen nur im Rahmen der einschlägigen Gesetze bzw. sofern wir durch Gerichtsbeschluss dazu verpflichtet sind.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Verantwortliche Stelle</h2>

          <div className="text-gray-700 leading-relaxed mb-4">
            <strong>1. Beauftragter im datenschutzrechtlichen Sinne</strong><br />
            Carl von Ossietzky Universität Oldenburg<br />
            Ammerländer Heerstraße 114-118<br />
            26129 Oldenburg<br />
            Telefon: 0441/7980<br />
            E-Mail: <a href="mailto:infopoint@uol.de" className="text-blue-600 hover:underline">infopoint@uol.de</a><br />
            Vertreten durch Ihren Präsidenten: Prof. Dr. Ralph Bruder
          </div>

          <div className="text-gray-700 leading-relaxed mb-4">
            <strong>2. Datenschutzbeauftragter</strong><br />
            Carl von Ossietzky Universität Oldenburg<br />
            <em>- Der Datenschutzbeauftragte -</em><br />
            Ammerländer Heerstraße 114-118<br />
            26129 Oldenburg<br />
            Telefon: 0441/7984196<br />
            E-Mail: <a href="mailto:dsuni@uol.de" className="text-blue-600 hover:underline">dsuni@uol.de</a><br />
            Internetauftritt: <a href="https://uol.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://uol.de/datenschutz</a>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <strong>3. Verantwortlicher des Mastergruppenprojekts "Döner"</strong><br />
            Prof. Dr. Philipp Staudt<br />
            Lehrstuhl für Wirtschaftsinformatik – Umwelt & Nachhaltigkeit<br />
            Carl von Ossietzky Universität Oldenburg<br />
            Ammerländer Heerstraße 114-118<br />
            26129 Oldenburg<br />
            E-Mail: <a href="mailto:philipp.staudt@uni-oldenburg.de" className="text-blue-600 hover:underline">philipp.staudt@uni-oldenburg.de</a>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Zweck der Verarbeitung</h2>
          <p className="text-gray-700 leading-relaxed">
            Die Webanwendung Th1nk dient der datenbankkonformen Aufbereitung von CSV-Dateien mit personenbezogenen Inhalten.
            Der Zugriff erfolgt über einen geschützten Login-Bereich und ist ausschließlich für autorisierte Mitarbeitende der Stadtverwaltung vorgesehen.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Verarbeitete Daten</h2>
          <p className="text-gray-700 leading-relaxed">Es werden folgende Daten verarbeitet:</p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2">
            <li>Login-Daten (z. B. Name, E-Mail-Adresse, Passwort-Hash)</li>
            <li>CSV-Dateien mit möglicherweise personenbezogenen Informationen</li>
            <li>Server-Logs (IP-Adresse, Zugriffszeitpunkte etc.)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Speicherung und Zugriff</h2>
          <p className="text-gray-700 leading-relaxed">
            Die hochgeladenen Daten werden serverseitig gespeichert, um den fortlaufenden Zugriff durch autorisierte Nutzer:innen zu ermöglichen.
            Die genaue Speicherdauer richtet sich nach den Anforderungen der Stadtverwaltung.
            Eine automatische Löschung erfolgt derzeit nicht.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Protokollierung bei Aufrufen der Webapp</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Jeder Zugriff auf unsere Webseite und jeder Abruf einer auf unserer Webseite hinterlegten Datei wird protokolliert.
            Die Speicherung dient internen, systembezogenen und statistischen Zwecken.
            Die gespeicherten Daten werden ausschließlich zu statistischen Zwecken ausgewertet.
            Eine Weitergabe an Dritte findet weder zu kommerziellen noch zu nichtkommerziellen Zwecken statt.
          </p>
          <p className="text-gray-700 leading-relaxed">Dabei werden folgende Angaben protokolliert:</p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2">
            <li>Datum und Uhrzeit des Abrufs</li>
            <li>IP-Adresse des anfragenden Rechners</li>
            <li>Verwendeter Webbrowser und anfragende Domain</li>
            <li>Abgerufene Dateien (z. B. CSV-Dateien mit personenbezogenen Informationen)</li>
            <li>Übertragene Datenmenge</li>
            <li>Meldung über erfolgreichen Abruf</li>
            <li>Verzeichnisschutzbenutzer (sofern zutreffend)</li>
            <li>Server-Logs (Zugriffszeitpunkte etc.)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Hosting und Datenweitergabe</h2>
          <p className="text-gray-700 leading-relaxed">
            Die Anwendung wird auf Servern eines ggf. externen Hosting-Anbieters betrieben.
            Der konkrete Anbieter wird in Abstimmung mit der Stadtverwaltung festgelegt.
            Es kann daher zu einer Übermittlung personenbezogener Daten an diesen Dienstleister kommen.
            Eine Verarbeitung erfolgt ausschließlich gemäß Art. 28 DSGVO.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Keine Verantwortung für externe Plattformen</h2>
          <p className="text-gray-700 leading-relaxed">
            Metabase wird auf eigenen Servern betrieben und ist eine separate Plattform zur Datenvisualisierung.
            Die Verarbeitung von Daten in Metabase erfolgt eigenverantwortlich durch die Nutzer:innen.
            Die Betreiber der Webanwendung stellen die Plattform lediglich bereit und übernehmen keine Haftung für die Speicherung, Verarbeitung oder Darstellung der Daten innerhalb von Metabase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Rechtsgrundlagen</h2>
          <p className="text-gray-700 leading-relaxed">
            Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung gegenüber der Stadtverwaltung)
            sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer Datenverarbeitung).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Rechte der betroffenen Personen</h2>
          <p className="text-gray-700 leading-relaxed">
            Betroffene Personen haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit sowie Widerspruch.
            Zudem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Kontakt bei Datenschutzfragen</h2>
          <p className="text-gray-700 leading-relaxed">
            Bei Fragen oder Anliegen zum Datenschutz wenden Sie sich bitte an:<br />
            E-Mail: <a href="mailto:pgdoener@lists.uni-oldenburg.de" className="text-blue-600 hover:underline">pgdoener@lists.uni-oldenburg.de</a>
          </p>
        </section>
      </div>
    </main>
  );
}
