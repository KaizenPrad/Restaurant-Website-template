const unsplash = (id, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const MENU_ITEMS = [
  {
    id: 'grilled-angus-steak',
    name: 'Grilled Angus Steak',
    description:
      'Perfectly grilled premium beef with herb butter and seasonal vegetables.',
    price: 300,
    category: 'Signature',
    prepTime: '25–30 min',
    image: unsplash('1600891964092-4316c288032e'),
    alt: 'Grilled Angus steak served with seasonal vegetables on a dark plate',
  },
  {
    id: 'truffle-cream-pasta',
    name: 'Truffle Cream Pasta',
    description:
      'Silky pasta tossed in a rich truffle cream sauce with parmesan.',
    price: 210,
    category: 'Pasta',
    prepTime: '20–25 min',
    image: unsplash('1473093295043-cdd812d0e601'),
    alt: 'Creamy truffle pasta finished with parmesan and fresh herbs',
  },
  {
    id: 'crispy-chicken-burger',
    name: 'Crispy Chicken Burger',
    description:
      'Golden crispy chicken, fresh lettuce, cheddar cheese, and our signature house sauce.',
    price: 150,
    category: 'House Favourite',
    prepTime: '15–20 min',
    image: unsplash('1568901346375-23c9450c58cd'),
    alt: 'Crispy chicken burger with lettuce, cheese and house sauce',
  },
  {
    id: 'seafood-risotto',
    name: 'Seafood Risotto',
    description:
      'Creamy arborio rice finished with fresh shrimp, mussels, and herbs.',
    price: 270,
    category: 'Seafood',
    prepTime: '25–30 min',
    image: unsplash('1559847844-5315695dadae'),
    alt: 'Seafood risotto with shrimp, mussels and fresh herbs',
  },
];

export const SPECIAL_MENU = {
  eyebrow: 'Seasonal Specials',
  title: 'The Chef’s Table Experience',
  description:
    'An intimate five-course journey through the season’s finest ingredients, personally curated and served by our executive chef. Limited to twelve guests each evening.',
  price: 145,
  image: unsplash('1504674900247-0877df9cc836', 1400),
  alt: 'An elegant chef’s table spread of seasonal fine-dining plates',
  highlights: [
    'Five-course tasting menu',
    'Sommelier wine pairing',
    'Intimate chef’s counter seating',
  ],
};
