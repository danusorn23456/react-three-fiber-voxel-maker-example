import { PixelBoard } from "./components";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        marginRight: "auto",
      }}
    >
      <Canvas shadows="soft" camera={{ position: [0, 10, 10] }}>
        <PixelBoard />
      </Canvas>
    </div>
  );
}

export default App;
