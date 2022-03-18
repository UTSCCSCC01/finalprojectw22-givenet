import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from "react";
import { Map, Marker } from "./Map";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

const MapContainer = (Props: any) => {

    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 0,
      lng: 0,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Wrapper apiKey="AIzaSyCPd0i6r0BWw5YokRyTPc1Fsid5ensWImw" render={render}>
                <Map 
                    center={center} 
                    onClick={onClick}
                    onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "100%"}}
                >
                {/* <Marker position={latLng} /> */}
                </Map>
            </Wrapper>
        </div>
    );
};



export default MapContainer;