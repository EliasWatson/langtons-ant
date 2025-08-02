import { Application } from "@pixi/react";

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Application
        className="absolute left-0 top-0"
        resizeTo={window}
        autoDensity={true}
        resolution={devicePixelRatio}
      ></Application>
    </div>
  );
}
