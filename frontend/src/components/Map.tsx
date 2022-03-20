import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Geocode from "react-geocode";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { TokenContext } from "../TokenContext";
import ListingOutput from "../../../backend/src/database/models/Listing";

Geocode.setApiKey("AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw");

Geocode.setLanguage("en");

Geocode.setRegion("CA");

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const getLatLngsFromListings = async (listings: ListingOutput[]) => {
   const listingLatLngs: google.maps.LatLng[] = [];

   listings.forEach((listing: ListingOutput) => {
     Geocode.fromAddress(listing.location).then(
       (response) => {
         const { lat, lng } = response.results[0].geometry.location;
        listingLatLngs.push(new google.maps.LatLng(lat, lng));
       },
       (error) => {
         console.error(error);
       }
     );
   });

   return listingLatLngs;
}

const MapContainer: React.VFC = () => {
  const [markerLatLngs, setMarkerLatLngs] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  // The token of the logged in user for authentication
  const { token } = React.useContext(TokenContext);

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
      const listingLatLngs = await getLatLngsFromListings(result);
      setMarkerLatLngs(listingLatLngs);
    } else if (response.status === 404) {
      console.log("404, unable to find listings");
    }
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setMarkerLatLngs([...markerLatLngs, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div id="map_canvas" style={{ height: "1000px", width: "500px", margin: "0", position: "relative" }}>
      <Wrapper apiKey={"AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw"} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {markerLatLngs.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default MapContainer;
