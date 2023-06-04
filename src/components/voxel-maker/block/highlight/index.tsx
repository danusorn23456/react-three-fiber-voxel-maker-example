import { ForwardedRef, forwardRef } from "react";
import { Event, FrontSide, Intersection, Mesh, Object3D } from "three";
import { Block } from "..";

export interface HighlighBlockProps {
  name?: string;
  onIntersect?: (obj: Intersection<Object3D<Event>>) => any;
}

const HighlighBlock = forwardRef(
  ({ name }: HighlighBlockProps, ref?: ForwardedRef<Mesh>) => {
    return (
      <Block
        side={FrontSide}
        ref={ref}
        name={name}
        position={[0, 0, 0]}
        opacity={0.1}
        edgesColor="green"
      />
    );
  }
);

export { HighlighBlock };
