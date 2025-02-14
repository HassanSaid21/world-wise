/* eslint-disable react/prop-types */

import CountryItem from "./CountryItem";

import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./CountryList.module.css";
import { useCities } from "../../contexts/CitiesContext";
// eslint-disable-next-line react/prop-types
function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return <Message message="Add your first message by clicking on the map" />;

  const countryMap = new Map();

cities.forEach((city) => {
  if (!countryMap.has(city.countryName)) {
    countryMap.set(city.countryName, {
      country: city.countryName,
      emoji: city.emoji,
      id: city.id,
    });
  }
});

const countries = Array.from(countryMap.values());

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
