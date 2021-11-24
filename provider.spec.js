import Provider from './Provider';

describe('Provider', () => {
  it('should print a city for given coords', async () => {
    const city = await Provider.findCity(51.5074, 0.1278);
    expect(city).toBe('London');
  });

  it('should print a weather for given city', async () => {
    const city = await Provider.findCity(51.5074, 0.1278);
    const weather = await Provider.getWeather(city);
    expect(weather).toBe(`The weather of ${city} is Cloudy`);
  });

  it('should print weather & currency for given city', async () => {
    const city = await Provider.findCity(51.5074, 0.1278);
    const [weather, currency] = await Promise.all([Provider.getWeather(city), Provider.getLocalCurrency(city)]);
    expect(`${weather} ${currency}`).toBe(`The weather of ${city} is Cloudy The local currency of ${city} is GBP`);
  });
});
