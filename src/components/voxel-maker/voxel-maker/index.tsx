import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Block, BlockProps, Ground, HighlighBlock } from "..";
import { Intersection, Mesh, Object3D, Vector3 } from "three";
import { Lights } from "../lights";
export interface PixelBoardProps {}
type NewBlock = Omit<BlockProps, "position"> & { position: Vector3 };
function PixelBoard({}: PixelBoardProps) {
  const [blocks, setBlocks] = useState<NewBlock[]>([]);

  const highlightBlockRef = useRef<Mesh>(null);
  const { raycaster, scene, camera, mouse } = useThree();
  const intersectsRef = useRef<Intersection<Object3D<Event>>[]>();

  function placeBlock(position: Vector3) {
    setBlocks((prevBlocks) => {
      const positionAlreadyTaken = prevBlocks?.some(
        (block) => block.position === position
      );

      if (positionAlreadyTaken) {
        console.info("this positon alreay taken");
        return [...prevBlocks];
      }

      const newBlock: NewBlock = {
        name: `block-${prevBlocks.length + 1}`,
        position,
      };

      return [...prevBlocks, newBlock];
    });
  }

  function handlePointDown() {
    const intersect = intersectsRef?.current?.filter(
      (intersect) =>
        intersect.object.name !== "highlight" && intersect.object.name
    )?.[0];
    if (intersect && highlightBlockRef.current) {
      const position = new Vector3().floor().addScalar(0.5);

      console.log(position);
      if (intersect.object.name.includes("block") && intersect.face) {
        position.copy(intersect.object.position);
        position.add(intersect.face.normal);
      } else {
        position.copy(highlightBlockRef.current.position);
      }
      placeBlock(position);
    }
  }

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    intersectsRef.current = raycaster.intersectObjects(scene.children);

    const intersect = intersectsRef?.current?.filter(
      (intersect) =>
        intersect.object.name && intersect.object.name !== "highlight"
    )?.[0];

    if (intersect) {
      if (!highlightBlockRef.current) {
        return console.warn("hihgtlightBlockRef not found");
      }

      const position = new Vector3()
        .copy(intersect.point)
        .floor()
        .addScalar(0.5);

      if (intersect.face && intersect.object.name.includes("block")) {
        position.copy(intersect.object.position);
        position.add(intersect.face.normal);
      }

      position.y = Math.max(0.5, position.y);

      highlightBlockRef.current.position.copy(position);
    }
  });

  return (
    <>
      <Lights />
      <HighlighBlock name="highlight" ref={highlightBlockRef} />
      {blocks?.map((blockProps, index) => (
        <Block key={index} {...blockProps} />
      ))}
      <Ground name="ground" onPointerDown={handlePointDown} />
      <OrbitControls />
    </>
  );
}

export { PixelBoard };
