/* eslint-disable react/prop-types */

import CountryItem from "./CountryItem";

import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./CountryList.module.css";
// eslint-disable-next-line react/prop-types
function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (cities.length == 0)
    return <Message message="Add your first message by clicking on the map" />;
  
  const countries = cities.reduce(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    },

    []
  );
  

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country}/>
      ))}
    </ul>
  );
}

export default CountryList;
