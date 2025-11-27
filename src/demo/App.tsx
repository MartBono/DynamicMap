import { TestMap } from "../components/DynamicMap/default-map";
import CartoStyle from "../components/DynamicMap/overlayStyle/carto";

function App() {
  return <TestMap overlays={[CartoStyle]} />;
}

export default App;
