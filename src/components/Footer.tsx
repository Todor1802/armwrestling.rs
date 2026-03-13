import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">armwrestling.rs</h3>
          <p className="mt-2 text-sm">
            Platforma za obaranje ruku u Srbiji — pronađi klub, prati turnire,
            nauči osnove.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Navigacija</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/clubs" className="transition-colors hover:text-white">
                Klubovi
              </Link>
            </li>
            <li>
              <Link href="/events" className="transition-colors hover:text-white">
                Turniri
              </Link>
            </li>
            <li>
              <Link href="/guides" className="transition-colors hover:text-white">
                Vodiči
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Pratite nas</h4>
          <p className="mt-2 text-sm">
            Instagram, Facebook i YouTube — linkovi uskoro.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        &copy; 2026 armwrestling.rs
      </div>
    </footer>
  );
}
