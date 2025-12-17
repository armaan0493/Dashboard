export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A73E8]">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-white">ShopSmart</span>
            </div>
            <p className="text-sm text-gray-400">
              Your one-stop shop for amazing deals on electronics, fashion, and
              more. Shop smart, save big!
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Beauty
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              Stay Connected
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#1A73E8] focus:outline-none"
              />
              <button className="rounded-lg bg-[#1A73E8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1557B0]">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
