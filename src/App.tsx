import "./App.css";
import { Minefield } from "./Minefield";

export default function App() {
  return (
    <main>
      <div>TODO: Selector</div>
      <Minefield config={Minefield.MEDIUM} />
    </main>
  );
}
