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
      <Canvas camera={{ position: [0, 15, 15] }}>
        <PixelBoard />
      </Canvas>
    </div>
  );
}

export default App;
