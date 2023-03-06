const energySources = [
  { value: 'median', name: 'Profit' },
  { value: 'profit', name: 'Median' },
];

const countriesInfo = [
  {
    median: 71.2,
    profit: 910.4,
  },
  {
    median: 72.5,
    profit: 223.6,
  },
  {
    median: 47.7,
    profit: 149.4,
  },
  {
    median: 17.9,
    profit: 283.6,
  },
  {
    median: 14.4,
    profit: 86.4,
  },
  {
    median: 6.6,
    profit: 101.7,
  },
];

const service = {
  getEnergySources() {
    return energySources;
  },
  getCountriesInfo() {
    return countriesInfo;
  },
};

export default service;
