import { Edges } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { DoubleSide, Mesh, Side } from "three";
import { useSpring, animated } from "@react-spring/three";

export interface BlockProps {
  name?: string;
  position?: Vector3;
  opacity?: number;
  color?: string;
  edgesColor?: string;
  onClick?: () => any;
  side?: Side;
}

const Block = forwardRef<Mesh, BlockProps>(
  (
    {
      name,
      position,
      color = "#39D353",
      edgesColor,
      opacity,
      onClick,
      side = DoubleSide,
    },
    ref
  ) => {
    const meshRef = useRef<Mesh>(null);

    useImperativeHandle(ref, () => meshRef.current!);
    const { scale } = useSpring({
      from: {
        scale: 0,
      },
      to: {
        scale: 1,
      },
    });

    return (
      <animated.mesh
        scale={scale}
        ref={meshRef}
        name={name}
        position={position}
        onClick={onClick}
      >
        <boxGeometry name={name} args={[1, 1, 1]} />
        <meshStandardMaterial
          opacity={opacity}
          transparent={opacity ? true : false}
          side={side}
          color={color}
        />
        {edgesColor ? <Edges color={edgesColor} /> : <></>}
      </animated.mesh>
    );
  }
);

export { Block };
