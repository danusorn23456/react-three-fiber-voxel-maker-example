import { MeshProps } from "@react-three/fiber";
import { DoubleSide, Vector3 } from "three";

export interface GroundProps extends MeshProps {
  name?: string;
  onClickAtPosition?: (positions: Vector3) => any;
}

function Ground({ name = "ground", ...rest }: GroundProps) {
  const size = 20;

  return (
    <>
      <mesh name={name} rotation={[Math.PI / 2, 0, 0]} {...rest}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial side={DoubleSide} color={"#202020"} />
      </mesh>
      <gridHelper
        position={[0, 0, 0]}
        args={[size, size, "#ffffff", "#ffffff"]}
      />
    </>
  );
}

export { Ground };
