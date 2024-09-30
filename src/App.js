import { ThemeProvider } from "./context/ThemeContext"; // Adjust the import path as needed
import Layout from "./components/Layout/Layout";
import "./App.css"

const App = () => {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
};

export default App;
