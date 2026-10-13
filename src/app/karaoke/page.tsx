import type { Metadata } from "next";
import { Hero, Headline, Sub } from "@/components/Hero";
import { Section, Em, Card } from "@/components/Section";
import { info } from "@/data/info";

export const metadata: Metadata = { title: "Karaoke · Pho Heritage" };

export default function KaraokePage() {
  return (
    <>
      <Hero>
        <Headline>
          The mic is <em>yours</em>, Richmond
        </Headline>
        <Sub>{info.karaokeHours}</Sub>
      </Hero>

      <Section title={<>Tuesdays only. <Em>One</Em> rule.</>}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h3 className="font-serif text-2xl text-ink">The Booth</h3>
            <p className="mt-3 text-base text-ink-soft">Up to 6 people. Two mics, one very loud speaker.</p>
            <p className="mt-4 text-base text-ink">$40 / hour</p>
          </Card>
          <Card>
            <h3 className="font-serif text-2xl text-ink">The Lounge</h3>
            <p className="mt-3 text-base text-ink-soft">Up to 12 people. Couches, a bar call button, room for a dance.</p>
            <p className="mt-4 text-base text-ink">$70 / hour</p>
          </Card>
          <Card>
            <h3 className="font-serif text-2xl text-ink">The Stage</h3>
            <p className="mt-3 text-base text-ink-soft">Up to 20 people. An actual stage. Birthdays live here.</p>
            <p className="mt-4 text-base text-ink">$110 / hour</p>
          </Card>
        </div>
        <p className="mt-10 text-center text-base text-ink-soft">The rule: whoever books picks the first song. Rooms go Tuesdays only, so book the week before. Food and cocktails run to the rooms all night.</p>
      </Section>
    </>
  );
}
