import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import axios from "axios";

const MapViwer = ({ ipAddress }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [currentTime, setCurrentTime] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // Function for converting 24-hour format time to 12-hour format
  const getLocalTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const amOrPm = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12;
    return `${String(adjustedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${amOrPm}`;
  };

  // Fetch geolocation details when ipAddress changes
  useEffect(() => {
    const fetchGeoLocation = async () => {
      try {
        const response = await axios.get(
          `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_API}&ip_address=${ipAddress}`,
        );
        if (response.data) {
          setLocation({
            latitude: parseFloat(response.data.latitude),
            longitude: parseFloat(response.data.longitude),
          });
          setCurrentTime(response.data.timezone.current_time);
          setAddress(
            `${response.data.city}, ${response.data.region}, ${response.data.country}`,
          );
          setError("");
        }
      } catch (err) {
        setError(
          "Error fetching geolocation. Please check the IP address or try again later.",
        );
      }
    };

    if (ipAddress) {
      fetchGeoLocation();
    }
  }, [ipAddress]); // Only ipAddress is needed in the dependency array

  return (
    <div className="flex w-full flex-col h-full">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="text-base font-semibold">{address}</div>
            {currentTime && (
              <div className="text-sm font-normal">
                {`${getLocalTime(currentTime)} local time`}
              </div>
            )}
          </div>
          {location.latitude && location.longitude ? (
            <div className="h-full">
              <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
                <Map
                  style={{ width: "100%", height: "100%" }}
                  defaultCenter={{
                    lat: location.latitude,
                    lng: location.longitude,
                  }}
                  defaultZoom={11}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                />
              </APIProvider>
            </div>
          ) : (
            <div>Loading map...</div>
          )}
        </>
      )}
    </div>
  );
};

export default MapViwer;
