export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Page Content */}
      <div className="grow py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              AdCreative Login App
            </h1>
            <p className="text-gray-600 text-sm mt-2">Manage your TikTok Ads</p>
          </header>

          {/* Main Content */}
          <main className="bg-white rounded-xl shadow-md p-6">{children}</main>
        </div>
      </div>

      {/* Footer (always bottom) */}
      <footer className="border-t border-gray-300 py-6 text-center bg-gray-100">
        <p className="text-gray-600 mb-3">© 2026 AdCreative Login App</p>

        <div className="flex justify-center gap-4 text-sm">
          <a
            href="/adcreative-login-app/privacy.html"
            className="text-black hover:underline"
          >
            Privacy
          </a>

          <span className="text-gray-400">|</span>

          <a
            href="/adcreative-login-app/terms.html"
            className="text-black hover:underline"
          >
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
