import * as React from "react";
import Geocode from "react-geocode";
import { TokenContext } from "../TokenContext";
import ListingOutput from "../../../backend/src/database/models/Listing";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

Geocode.setApiKey("AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw");

Geocode.setLanguage("en");

Geocode.setRegion("CA");

const containerStyle = {
  width: "600px",
  height: "600px",
};

const center = {
  lat: 43.589,
  lng: -79.644,
};

type MarkerInfo = {
  id: number;
  position: google.maps.LatLng;
  listing: ListingOutput;
};

export default function MapContainer() {
  const [markerInfos, setMarkerInfos] = React.useState<MarkerInfo[]>([]);
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] =
    React.useState<number>(-1);

  // The token of the logged in user for authentication
  const { token } = React.useContext(TokenContext);

  const handleToggleWindowOpen = (markerId: number) => {
    setOpenInfoWindowMarkerId(markerId);
  };

  const handleToggleWindowClosed = () => {
    setOpenInfoWindowMarkerId(-1);
  };

  React.useEffect(() => {
    // Fetch the currently active listings to make into markers
    const fetchListings = async () => {
      const response = await fetch("/listing/all", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);

      if (response.status === 200) {
        const result: ListingOutput[] = await response.json();
        console.log(result);
        const listingMarkerInfos: MarkerInfo[] = [];
        let index = 0;

        for (const listing of result) {
          try {
            const response = await Geocode.fromAddress(listing.location);
            const { lat, lng } = response.results[0].geometry.location;
            const listingLatLng = new google.maps.LatLng(lat, lng);
            const markerInfo: MarkerInfo = {
              id: index,
              position: listingLatLng,
              listing: listing,
            };
            listingMarkerInfos.push(markerInfo);
          } catch (err) {
            console.log("Getting latlng from address failed", err);
          }
          index = index + 1;
        }

        console.log(listingMarkerInfos);

        setMarkerInfos(listingMarkerInfos);
      } else if (response.status === 404) {
        console.log("404, unable to find listings");
      }
    };

    fetchListings();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {
          // Create the marker HTML elements from the markerInfo
          markerInfos.map((markerInfo) => (
            <Marker
              key={markerInfo.id}
              position={markerInfo.position}
              onClick={() => handleToggleWindowOpen(markerInfo.id)}
            >
              {openInfoWindowMarkerId === markerInfo.id && (
                <InfoWindow onCloseClick={handleToggleWindowClosed}>
                  <div>{markerInfo.listing.location}</div>
                </InfoWindow>
              )}
              <></>
            </Marker>
          ))
        }
      </GoogleMap>
    </LoadScript>
  );
}
