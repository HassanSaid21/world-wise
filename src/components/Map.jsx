import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useCities } from "../../contexts/CitiesContext";
import { useEffect, useState } from "react";

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const [position, setPosition] = useState([40, 0]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  console.log(position);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={city.position}>
            <Popup>
              {" "}
              <div> {city.cityName}</div>
              {city.notes}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
}
// his component is used to change the center of the map programmatically based on user interaction when he click on one of the cities then the center changes to be the location of that city
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
