import { info } from "@/data/info";

export function Footer() {
  return (
    <footer className="border-t border-sand bg-cream px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 font-sans text-sm text-ink-soft md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl text-ink">Pho Heritage</p>
          <p className="mt-2">{info.address}</p>
          <p>{info.phone}</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-terracotta">Instagram</a>
          <a href="#" className="hover:text-terracotta">Reservations</a>
          <a href="#" className="hover:text-terracotta">Gift cards</a>
        </div>
        <p>© {new Date().getFullYear()} Pho Heritage</p>
      </div>
    </footer>
  );
}
