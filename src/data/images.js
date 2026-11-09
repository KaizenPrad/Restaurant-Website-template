const unsplash = (id, width = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const IMAGES = {
  heroDish: unsplash('1544025162-d76694265947', 1400),
  aboutChef: unsplash('1577219491135-ce391730fb2c', 1000),
  aboutPlating: unsplash('1467003909585-2f8a72700288', 800),
  aboutInterior: unsplash('1517248135467-4c7edcad34c4', 800),
  specials: unsplash('1504674900247-0877df9cc836', 1400),
  guestOne: unsplash('1494790108377-be9c29b29330', 400),
  guestTwo: unsplash('1500648767791-00dcc994a43e', 400),
  guestThree: unsplash('1534528741775-53994a69daeb', 400),
  ratingGuests: [
    unsplash('1507003211169-0a1dd7228f2d', 200),
    unsplash('1438761681033-6461ffad8d80', 200),
    unsplash('1544005313-94ddf0286df2', 200),
  ],
};
