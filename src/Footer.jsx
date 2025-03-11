export default function Footer() {
    return (
        <footer className="bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-lg font-semibold mb-4">Rechtliches</h2>
                <div className="flex flex-col space-y-2">
                    <a href="/impressum" className="text-sm hover:scale-105 transition-transform">Impressum</a>
                    <a href="/datenschutz" className="text-sm hover:scale-105 transition-transform">Datenschutzerklärung</a>
                </div>
                {/* Falls in Zukunft Cookies verwendet werden, hier einen Hinweis oder eine Cookie-Policy hinzufügen */}
                <div className="mt-6 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Universität Oldenburg. Alle Rechte vorbehalten.</p>
                </div>
            </div>
        </footer>
    );
}
