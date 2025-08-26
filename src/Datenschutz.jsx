export default function Datenschutz() {
  return (
    <main className="p-6 flex justify-center mb-2">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          The protection of your personal data is a top priority. This privacy policy informs you about the type, scope, and purpose of the processing of personal data in our web application.
          Th1nk assumes no responsibility for the timeliness, correctness, completeness, or quality of the provided information; this responsibility lies with the city administration.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Personal Data</h2>
          <p className="text-gray-700 leading-relaxed">
            Personal data is any information relating to an identified or identifiable natural person.
            A person is considered identifiable if they can be identified directly or indirectly, particularly through assignment to an identifier such as a name.
            Your data is securely transmitted using state-of-the-art encryption.
            No data will be shared with third parties without your consent.
            Collection of personal data and its transmission to authorized governmental institutions and authorities is only carried out in accordance with applicable laws or if we are required to do so by court order.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Responsible Parties</h2>

          <div className="text-gray-700 leading-relaxed mb-4">
            <strong>1. Officer in terms of data protection law</strong><br />
            Carl von Ossietzky University of Oldenburg<br />
            Ammerländer Heerstraße 114-118<br />
            26129 Oldenburg<br />
            Phone: 0441/7980<br />
            Email: <a href="mailto:infopoint@uol.de" className="text-blue-600 hover:underline">infopoint@uol.de</a><br />
            Represented by its president: Prof. Dr. Ralph Bruder
          </div>

          <div className="text-gray-700 leading-relaxed mb-4">
            <strong>2. Data Protection Officer</strong><br />
            Carl von Ossietzky University of Oldenburg<br />
            <em>- The Data Protection Officer -</em><br />
            Ammerländer Heerstraße 114-118<br />
            26129 Oldenburg<br />
            Phone: 0441/7984196<br />
            Email: <a href="mailto:dsuni@uol.de" className="text-blue-600 hover:underline">dsuni@uol.de</a><br />
            Website: <a href="https://uol.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://uol.de/datenschutz</a>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <strong>3. Responsible for the master group project "Döner"</strong><br />
            Prof. Dr. Philipp Staudt<br />
            Chair of Business Informatics – Environment & Sustainability<br />
            Carl von Ossietzky University of Oldenburg<br />
            Ammerländer Heerstraße 114-118<br />
            26129 Oldenburg<br />
            Email: <a href="mailto:philipp.staudt@uni-oldenburg.de" className="text-blue-600 hover:underline">philipp.staudt@uni-oldenburg.de</a>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Purpose of Processing</h2>
          <p className="text-gray-700 leading-relaxed">
            The Th1nk web application is used for database-compliant preparation of CSV files containing personal data.
            Access is via a secure login area and is intended exclusively for authorized city administration staff.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Processed Data</h2>
          <p className="text-gray-700 leading-relaxed">The following data is processed:</p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2">
            <li>Login data (e.g., name, email address, password hash)</li>
            <li>CSV files that may contain personal information</li>
            <li>Server logs (IP address, access times, etc.)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Storage and Access</h2>
          <p className="text-gray-700 leading-relaxed">
            Uploaded data is stored on the server to enable ongoing access by authorized users.
            The exact storage duration is determined by the requirements of the city administration.
            Automatic deletion does not currently occur.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Logging Web App Access</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Every access to our website and every retrieval of a file stored on our website is logged.
            The storage serves internal, system-related, and statistical purposes.
            The stored data is evaluated exclusively for statistical purposes.
            No data is shared with third parties for commercial or non-commercial purposes.
          </p>
          <p className="text-gray-700 leading-relaxed">The following information is logged:</p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mt-2">
            <li>Date and time of access</li>
            <li>IP address of the requesting computer</li>
            <li>Web browser used and requesting domain</li>
            <li>Retrieved files (e.g., CSV files with personal data)</li>
            <li>Data volume transferred</li>
            <li>Confirmation of successful retrieval</li>
            <li>Directory protection user (if applicable)</li>
            <li>Server logs (access times, etc.)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Hosting and Data Sharing</h2>
          <p className="text-gray-700 leading-relaxed">
            The application is hosted on servers of a possibly external hosting provider.
            The specific provider is determined in coordination with the city administration.
            Personal data may be transmitted to this service provider.
            Processing occurs exclusively in accordance with Art. 28 GDPR.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Responsibility for External Platforms</h2>
          <p className="text-gray-700 leading-relaxed">
            Metabase is hosted on its own servers and is a separate platform for data visualization.
            Data processing in Metabase is the responsibility of the users.
            The operators of the web application only provide the platform and assume no liability for the storage, processing, or presentation of data within Metabase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Legal Basis</h2>
          <p className="text-gray-700 leading-relaxed">
            Data processing is based on Art. 6(1)(b) GDPR (contract fulfillment towards the city administration)
            and Art. 6(1)(f) GDPR (legitimate interest in secure data processing).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Rights of Data Subjects</h2>
          <p className="text-gray-700 leading-relaxed">
            Data subjects have the right to access, rectify, delete, restrict processing,
            data portability, and object.
            They also have the right to lodge a complaint with a data protection supervisory authority.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact for Data Protection Questions</h2>
          <p className="text-gray-700 leading-relaxed">
            For questions or concerns regarding data protection, please contact:<br />
            Email: <a href="mailto:pgdoener@lists.uni-oldenburg.de" className="text-blue-600 hover:underline">pgdoener@lists.uni-oldenburg.de</a>
          </p>
        </section>
      </div>
    </main>
  );
}
