/** Chef's favorites on the home page. Independent of menu.json so the menu page stays as designed. */
export type Featured = { name: string; desc: string; price: number; image: string };

export const featuredEntrees: Featured[] = [
  { name: "Pho Tai", desc: "Rare eye-round, thin-sliced tableside", price: 17, image: "/dishes/pho-tai.jpg" },
  { name: "Vegetarian Eggroll Vermicelli", desc: "Crispy tofu and mushroom eggrolls, fresh herbs, vegetarian nuoc cham", price: 15, image: "/dishes/veg-eggroll-vermicelli.jpg" },
  { name: "Grilled Pork Chop Broken Rice", desc: "Lemongrass-marinated pork chop, steamed egg meatloaf, nuoc cham", price: 17, image: "/dishes/pork-chop-broken-rice.jpg" },
  { name: "Wonton Soup", desc: "Pork and shrimp wontons, baby bok choy, fried garlic, clear broth", price: 14, image: "/dishes/wonton-soup.jpg" },
  { name: "Meatball Pho", desc: "Pho bo vien: house beef meatballs, onion, cilantro, scallion", price: 16, image: "/dishes/meatball-pho.jpg" },
];

export const featuredDrinks: Featured[] = [
  { name: "Fresh Coconut Juice", desc: "Young coconut water with the flesh, over ice", price: 6, image: "/dishes/coconut-juice.jpg" },
  { name: "Thai Tea", desc: "Spiced black tea, condensed milk, over ice", price: 5, image: "/dishes/thai-tea.jpg" },
  { name: "Vietnamese Lemonade", desc: "Fresh lime, cane sugar, soda, over ice", price: 5, image: "/dishes/vietnamese-lemonade.jpg" },
  { name: "Vietnamese Coffee", desc: "Phin-dripped robusta, condensed milk, over ice", price: 6, image: "/dishes/vietnamese-coffee.jpg" },
];
