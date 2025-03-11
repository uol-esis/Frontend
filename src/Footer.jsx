export default function Footer() {
    return (
        <footer className="bg-gray-100 p-3 text-sm text-center flex justify-center gap-6">
            <a href="/impressum" className="hover:scale-105 transition-transform">Impressum</a>
            <a href="/datenschutz" className="hover:scale-105 transition-transform">Datenschutz</a>
            {/* &copy; {new Date().getFullYear()} Universität Oldenburg. Alle Rechte vorbehalten. */}
        </footer>
    );
}
