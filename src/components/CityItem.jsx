/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const { cityName, emoji, date, id, position ,country} = city;
  const{ currentCity} =useCities()
  return (
    <li>
      <NavLink
        className={`${styles.cityItem}   ${ currentCity.id===id  ?styles['cityItem--active'] :""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <img className={styles.emoji} src={emoji} alt={country} width="025"
        height="20"/>
        <h3 className={styles.name}> {cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button className={styles.deleteBtn}>&times;</button>
      </NavLink>
    </li>
  );
}

export default CityItem;
