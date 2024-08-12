"use client";

import { Environment } from "@react-three/drei";
import { useMap } from "react-three-map/maplibre";
import { useEffect } from "react";
import { ScoutingArea } from "@/types/ScoutingArea";
import MapPin from "./MapPin";

type Props = {
  areas: ScoutingArea[];
  selectedArea: ScoutingArea;
  setSelectedArea: (newSelectedArea: ScoutingArea) => void;
};

const MapView = (props: Props) => {
  const map = useMap();

  useEffect(() => {
    if (props.selectedArea) {
      map.panTo([props.selectedArea.longitude, props.selectedArea.latitude], {
        duration: 1000,
      });
    }
  }, [props.selectedArea]);

  return (
    <>
      <ambientLight intensity={0.5 * Math.PI} />
      <directionalLight
        castShadow
        position={[2.5, 50, 5]}
        intensity={1.5 * Math.PI}
        shadow-mapSize={1024}
      ></directionalLight>
      {props.areas.map((a) => (
        <MapPin
          key={a.id}
          handleClick={() => props.setSelectedArea(a)}
          latitude={a.latitude}
          longitude={a.longitude}
          isSelected={a.id === props.selectedArea.id}
        />
      ))}
      <Environment preset="dawn" />
    </>
  );
};

export default MapView;
