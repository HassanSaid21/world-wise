import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCities } from "../../contexts/CitiesContext";
import { useEffect, useState } from "react";
import Button from "./Button";
import useGeolocation from "../../hooks/useGeolocation";
import { useUrlPosition } from "../../hooks/useUrl";

function Map() {
  const { cities } = useCities();
  const [lat, lng] = useUrlPosition()
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeolocation();
  const [position, setPosition] = useState([40, 0]);

  useEffect(
    function () {
      if (lat != null && lng != null) setPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geolocationPosition?.lat && geolocationPosition?.lng)
        setPosition([geolocationPosition.lat, geolocationPosition.lng]);
      
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "...Loading" : "use your location"}
        </Button>
      )}
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
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}
// this component is used to change the center of the map programmatically based on user interaction when he click on one of the cities then the center changes to be the location of that city
function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]); // updates only when `position` changes
  return null;
}
function MapClickHandler() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), // redirect to form component
  });

  return null;
}
export default Map;
