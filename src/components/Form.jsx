// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

//* hello my name
//! that is an error
//? that is a query
//// wow that is
//TODO HELLO

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../../hooks/useUrl";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../../contexts/CitiesContext";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [startDate, setStartDate] = useState(new Date()); // YYYY-MM-DD
  const [geoCodingError, setGEoCodingError] = useState("");
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState();
  const { addCity, isLoading } = useCities();
  useEffect(
    function () {
      async function fetchCityData() {
        // this ensure that whenever the user paste the form url , the fetch will never trigger
        if (lat == null || lng == null) return;
        try {
          setIsLoadingGeocoding(true);
          setGEoCodingError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          if (!res.ok)
            throw new Error("something went wrong during fetching data ");
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error(
              "it doesn't seem to be a city ,click some where else 😁"
            );
          setEmoji(data.countryCode ? data.countryCode.toLowerCase() : "🏳");
          setCityName(data.city || "");
          setCountryName(data.countryName || "");
        } catch (err) {
          setGEoCodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !startDate) return;

    const newCity = {
      cityName,
      countryName,
      date: startDate,
      notes,
      emoji: `https://flagcdn.com/w320/${emoji}.png`,
      position: { lat, lng },
    };
    await addCity(newCity);
    navigate("/app");
  }

  {
    if (isLoadingGeocoding) return <Spinner />;
  }
  {
    if (geoCodingError) return <Message message={geoCodingError} />;
  }
  {
    if (!lat || !lng)
      return <Message message={"click on somewhere on the map"} />;
  }
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {}
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
