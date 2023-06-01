import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Detail from "./views/Detail/Detail";
import CreatePokemon from "./views/CreatePokemon/CreatePokemon";
import MyPokemons from "./views/MyPokemons/MyPokemons";
// import { Route, Switch } from "react-router-dom";

const themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "#113f67",
    },
    background: {
      default: "#E0FFFF",
    },
  },
});

const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#230C2E",
    },
    secondary: {
      main: "#e7eaf6",
    },
    background: {
      default: "#424242",
    },
  },
});

function App() {
  const location = useLocation();
  const currentTheme = "light";
  return (
    <div className="App">
      <ThemeProvider theme={currentTheme === "light" ? themeLight : themeDark}>
        <CssBaseline />
        <Navbar currentLocation={location.pathname} />
        <Routes>
          <Route exact path="" element={<Home />} />
          <Route path="pokemon/:id" element={<Detail />} />
          <Route path="create_pokemon" element={<CreatePokemon />} />
          <Route path="my_pokemons" element={<MyPokemons />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
