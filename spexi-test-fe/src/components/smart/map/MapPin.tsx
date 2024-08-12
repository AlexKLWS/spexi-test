"use client";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { NearCoordinates } from "react-three-map";

const params = {
  color: "#94a3b8",
  transmission: 1,
  opacity: 0.5,
  metalness: 0.1,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  specularColor: "#ffffff",
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1,
};

type Props = {
  handleClick?: () => void;
  isSelected?: boolean;
  longitude: number;
  latitude: number;
};

const MapPin = (props: Props) => {
  const obj = useLoader(
    OBJLoader,
    "https://alexoregonpublicbucket.s3.us-west-2.amazonaws.com/map+pointer.obj"
  );

  return (
    <NearCoordinates latitude={props.latitude} longitude={props.longitude}>
      <primitive
        onClick={props.handleClick}
        object={obj.children[0].clone()}
        scale={28}
        material-color={props.isSelected ? "#0000ff" : "#94a3b8"}
        material={
          new THREE.MeshPhysicalMaterial({
            color: params.color,
            metalness: params.metalness,
            roughness: params.roughness,
            ior: params.ior,
            envMapIntensity: params.envMapIntensity,
            transmission: params.transmission, // use material.transmission for glass materials
            specularIntensity: params.specularIntensity,
            specularColor: params.specularColor,
            opacity: params.opacity,
            side: THREE.DoubleSide,
            transparent: true,
          })
        }
      />
    </NearCoordinates>
  );
};

useLoader.preload(
  OBJLoader,
  "https://alexoregonpublicbucket.s3.us-west-2.amazonaws.com/map+pointer.obj"
);

export default MapPin;
