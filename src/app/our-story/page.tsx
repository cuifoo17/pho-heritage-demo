import type { Metadata } from "next";
import { Hero, Headline } from "@/components/Hero";
import { Section, Card } from "@/components/Section";

export const metadata: Metadata = { title: "Our Story · Pho Heritage" };

const story = [
  {
    title: "Family Recipes Passed Down",
    text: "Preserved through generations, so every dish carries the authentic taste of Vietnam. Each ingredient and technique tells our family's story.",
  },
  {
    title: "Fresh Ingredients Daily",
    text: "Herbs, spices, and produce sourced every day. From star anise to cilantro, every component is chosen to honor traditional flavors.",
  },
  {
    title: "Cultural Heritage in Every Bowl",
    text: "Every dish is a celebration of Vietnamese culture. Authenticity you can taste in every bite.",
  },
  {
    title: "Passionate Culinary Team",
    text: "Decades of experience and a real love for Vietnamese cooking. Each dish is made with the care of a family meal.",
  },
];

export default function StoryPage() {
  return (
    <>
      <Hero>
        <Headline>
          Three <em>generations</em> and counting
        </Headline>
      </Hero>

      <Section id="story">
        <div className="grid gap-4 md:grid-cols-2">
          {story.map((s) => (
            <Card key={s.title}>
              <h2 className="font-serif text-3xl text-ink md:text-4xl">{s.title}</h2>
              <p className="mt-4 text-base text-ink-soft md:text-lg">{s.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
