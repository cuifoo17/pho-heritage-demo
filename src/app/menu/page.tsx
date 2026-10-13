import type { Metadata } from "next";
import { MenuPanel } from "@/components/MenuPanel";
import { Section, Em } from "@/components/Section";
import menu from "@/data/menu.json";

export const metadata: Metadata = { title: "Menu · Pho Heritage" };

export default function MenuPage() {
  return (
    <MenuPanel>
      <Section id="menu" className="pt-40 md:pt-44" title={<>The <Em>menu</Em></>}>
        <div className="space-y-16">
          {menu.sections.map((s) => (
            <div key={s.title}>
              <h3 className="font-serif text-3xl text-ink md:text-4xl">{s.title}</h3>
              {s.note && <p className="mt-2 text-base text-ink-soft">{s.note}</p>}
              <ul className="mt-6 divide-y divide-sand">
                {s.items.map((it) => (
                  <li key={it.name} className="flex items-baseline justify-between gap-6 py-4">
                    <div>
                      <p className="text-lg text-ink">{it.name}</p>
                      <p className="text-base text-ink-soft">{it.desc}</p>
                    </div>
                    <p className="shrink-0 text-lg text-ink">${it.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </MenuPanel>
  );
}
