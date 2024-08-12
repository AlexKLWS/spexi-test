"use client";

import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import { ScoutingArea } from "@/types/ScoutingArea";
import MapView from "./MapView";

type Props = {
  areas: ScoutingArea[];
  selectedArea: ScoutingArea;
  setSelectedArea: (newSelectedArea: ScoutingArea) => void;
};

const MapBackground = (props: Props) => {
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 pointer-events-auto -z-10">
      <Map
        antialias
        initialViewState={{
          latitude: props.areas[0].latitude,
          longitude: props.areas[0].longitude,
          zoom: 15,
          pitch: 60,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Canvas
          latitude={props.areas[0].latitude}
          longitude={props.areas[0].longitude}
        >
          <MapView
            areas={props.areas}
            selectedArea={props.selectedArea}
            setSelectedArea={props.setSelectedArea}
          />
        </Canvas>
      </Map>
    </div>
  );
};

export default MapBackground;
