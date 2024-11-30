type Level = {
  pre: string;
  roast: string;
};

type Roast = {
  light: Level;
  medium: Level;
  burnt: Level;
};

type RoastItem = {
  name: string;
  roast: Roast;
};
