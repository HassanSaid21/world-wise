/* eslint-disable react/prop-types */
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img className={styles.emoji} src={country.emoji} alt={country} width="025"
            height="20"/>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
