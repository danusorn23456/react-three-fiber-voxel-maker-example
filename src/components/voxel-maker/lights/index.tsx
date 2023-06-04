function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 1, 0]} color={"lightgreen"} castShadow />
      {/* <pointLight position={[0, 1, 0]} color={"green"} castShadow /> */}
    </>
  );
}

export { Lights };
