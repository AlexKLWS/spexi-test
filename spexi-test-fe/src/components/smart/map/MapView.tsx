"use client";

import {
  Billboard,
  Box,
  ContactShadows,
  Cylinder,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import { NearCoordinates } from "react-three-map";
import { useMap } from "react-three-map/maplibre";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";
import { useContext, useEffect } from "react";
import { SelectedAreaContext } from "@/lib/context/SelectedAreaContext";
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
    console.log(
      "🚀 ~ file: MapView.tsx ~ line 38 ~ useEffect ~ selectedArea",
      props.selectedArea
    );
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
        />
      ))}
      <Environment preset="dawn" />
    </>
  );
};

export default MapView;
