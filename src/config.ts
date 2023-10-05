export const config = {
  colors: {
    // https://coolors.co/palette/cad2c5-84a98c-52796f-354f52-2f3e46
    background: '#1a1b26',
    rocket: '#ffffff',
    target: '#6874e8',
    obstacle: '#aaaaaa',
  },
  lifespan: 500,
  populationSize: 100,
  mutationRate: 0.001,
};

export type Config = typeof config;
