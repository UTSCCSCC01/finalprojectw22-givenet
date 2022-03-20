import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Geocode from "react-geocode";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { TokenContext } from "../TokenContext";
import ListingOutput from "../../../backend/src/database/models/Listing";
import { withGoogleMap, GoogleMap, Marker, InfoWindow, withScriptjs } from "react-google-maps";
import { ConstructionOutlined } from "@mui/icons-material";

Geocode.setApiKey("AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw");

Geocode.setLanguage("en");

Geocode.setRegion("CA");

type MarkerInfo = {
  position: google.maps.LatLng,
  listing: ListingOutput
};

const MapContainer: React.VFC = () => {
  const [listings, setListings] = React.useState<ListingOutput[]>([]);
  const [markerLatLngs, setMarkerLatLngs] = React.useState<google.maps.LatLng[]>([]);
  const [markerInfos, setMarkerInfos] = React.useState<MarkerInfo[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = React.useState<number>(-1);

  // The token of the logged in user for authentication
  const { token } = React.useContext(TokenContext);

  const getMarkersFromListings = async () => {
    const listingLatLngs: google.maps.LatLng[] = [];
    const listingMarkerInfos: MarkerInfo[] = [];
  
    listings.forEach(async (listing: ListingOutput) => {
      try {
       const response = await Geocode.fromAddress(listing.location);
       const { lat, lng } = response.results[0].geometry.location;
       const listingLatLng = new google.maps.LatLng(lat, lng);
       listingLatLngs.push(listingLatLng);
       const markerInfo: MarkerInfo = {
         position: listingLatLng,
         listing: listing
       };
       
       listingMarkerInfos.push(markerInfo);
      }
      catch (err) {
        console.log('Getting latlng from address failed', err);
      }
    });
  
    console.log(listingMarkerInfos);
  
    setMarkerInfos(listingMarkerInfos);
  }

  const fetchListings = async () => {
    const response = await fetch("/listing/all", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.status);
  
    if (response.status === 200) {
      let result: ListingOutput[] = await response.json();
      console.log(result);
      setListings(result);
    } else if (response.status === 404) {
      console.log("404, unable to find listings");
    }
  };

  const handleToggleWindowOpen = (markerId: number) => {
    setOpenInfoWindowMarkerId(markerId);
  };

  const handleToggleWindowClosed = () => {
    setOpenInfoWindowMarkerId(-1);
  };

  React.useEffect(() => {
    fetchListings();
    getMarkersFromListings();
  }, []);

  console.log(markerLatLngs);
  console.log(listings);
  console.log(markerInfos);

  console.log(markerInfos.map(( markerInfo, index ) => (
    <Marker
      key={index}
      position={markerInfo.position}
      onClick={() => handleToggleWindowOpen(index)}
    >
      (
        <InfoWindow onCloseClick={() => handleToggleWindowClosed()}>
          <div>{markerInfo.listing.notes}</div>
        </InfoWindow>
      )
    </Marker>
  )));

  const MapWithMarkers = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
      defaultCenter={center}
      defaultZoom={zoom}
    >
      {markerInfos.map(( markerInfo, index ) => (
        <Marker
          key={index}
          position={markerInfo.position}
          onClick={() => handleToggleWindowOpen(index)}
        >
          (
            <InfoWindow onCloseClick={() => handleToggleWindowClosed()}>
              <div>{markerInfo.listing.notes}</div>
            </InfoWindow>
          )
        </Marker>
      ))}
    </GoogleMap>
  ));

  return (
    <MapWithMarkers 
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style = {{height: `400px`}} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default MapContainer;
