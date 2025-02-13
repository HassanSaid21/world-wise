// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

//* hello my name
//! that is an error
//? that is a query
//// wow that is
//TODO HELLO

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../../hooks/useUrl";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // YYYY-MM-DD
  const [geoCodingError, setGEoCodingError] = useState("");
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState();
  useEffect(
    function () {
      async function fetchCityData() {
        if (lat == null || lng == null) return;
        try {
          setIsLoadingGeocoding(true);
          setGEoCodingError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          if (!res.ok)
            throw new Error("something went wrong during fetching data ");
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "it doesn't seem to be a city ,click some where else 😁"
            );
          setEmoji(data.countryCode ? convertToEmoji(data.countryCode) : "🏳");
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
  {
    if (isLoadingGeocoding) return <Spinner />;
  }
  {
    if (geoCodingError) return <Message message={geoCodingError} />;
  }
  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
