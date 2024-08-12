"use client";

import { ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { useState } from "react";
import { NearCoordinates, coordsToVector3 } from "react-three-map";

const params = {
  color: 0xf8fafc,
  transmission: 1,
  opacity: 0.5,
  metalness: 0.1,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1,
};

type Props = {
  handleClick?: () => void;
  longitude: number;
  latitude: number;
};

const MapPin = (props: Props) => {
  const [hovered, hover] = useState(false);
  const obj = useLoader(
    OBJLoader,
    "https://alexoregonpublicbucket.s3.us-west-2.amazonaws.com/map+pointer.obj"
  );

  return (
    <NearCoordinates latitude={props.latitude} longitude={props.longitude}>
      <primitive
        onClick={() => {
          props.handleClick?.();
          hover(false);
        }}
        object={obj.children[0].clone()}
        scale={28}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        material-color={hovered ? "purple" : "orange"}
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
