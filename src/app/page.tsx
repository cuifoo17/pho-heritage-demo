import { Hero, Headline } from "@/components/Hero";
import { Section, Em, Card, Pill } from "@/components/Section";
import { Carousel, DishCard } from "@/components/Carousel";
import { Reviews } from "@/components/Reviews";
import { info, ratings, reviews } from "@/data/info";
import menu from "@/data/menu.json";
import { featuredEntrees, featuredDrinks } from "@/data/featured";

const cocktails = menu.sections.filter((s) => s.title === "Cocktails").flatMap((s) => s.items.filter((it) => it.favorite));
const drinks = [...featuredDrinks, ...cocktails];

export default function HomePage() {
  return (
    <>
      <Hero>
        <Headline>
          Vibes that entice you in, <em>recipes</em> that bring you back.
        </Headline>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Pill href="/menu/">See the Menu</Pill>
          <Pill href="#" secondary>Order Now</Pill>
        </div>
      </Hero>

      <Section id="favorites" title={<>Favorites from our <Em>Chef</Em></>}>
        <div className="space-y-14">
          <Carousel title="Entrees">
            {featuredEntrees.map((it) => (
              <DishCard key={it.name} {...it} />
            ))}
          </Carousel>
          <Carousel title="Drinks">
            {drinks.map((it) => (
              <DishCard key={it.name} {...it} />
            ))}
          </Carousel>
        </div>
      </Section>

      <Section id="reviews" tone="sand" title={<>What people are <Em>saying</Em></>}>
        <Reviews fallbackRatings={ratings} fallbackReviews={reviews} />
      </Section>

      <Section id="hours" title={<>Hours and <Em>where</Em> to find us</>}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <dl className="divide-y divide-sand">
              {info.hours.map((h) => (
                <div key={h.days} className="flex justify-between py-3 text-base">
                  <dt className="text-ink">{h.days}</dt>
                  <dd className="text-ink-soft">{h.time}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <p className="text-base text-ink">{info.address}</p>
            <p className="mt-1 text-base text-ink-soft">{info.phone}</p>
            <div className="mt-6">
              <Pill href={info.directionsUrl} secondary>Get directions</Pill>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
