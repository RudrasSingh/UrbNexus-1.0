import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";

const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = React.useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setLocation({ lat, lng });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <span>
          Lat: {position[0]}, Longitude: {position[1]}
        </span>
      </Popup>
    </Marker>
  );
};

LocationMarker.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

const MapComponent = ({ setLocation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-white border border-gray-300 rounded-lg shadow-lg">
      <MapContainer
        center={[22.576230119592772, 88.42705075371381]} // Initial center coordinates
        zoom={10}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>
      <div className="p-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

MapComponent.propTypes = {
  setLocation: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MapComponent;
