import { useTheme } from "./hooks/useTheme";

const ToggleTheme = () => {

     const { theme, toggleTheme, setLight, setDark, setCustomTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={setLight}>Set Light</button>
      <button onClick={setDark}>Set Dark</button>
      <button onClick={() => setCustomTheme("blue")}>Set Blue Theme</button>
    </div>
  );
}
export default ToggleTheme