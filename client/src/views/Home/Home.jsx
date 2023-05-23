import React from "react";
import Landing from "../../components/Landing/Landing";
import Pokemons from "../../components/Pokemons/Pokemons";
import SearchInputs from "../../components/SearchInputs/SearchInputs";

export default function Home(props) {
  return (
    <div>
      <Landing />
      <hr />
      <SearchInputs />
      <Pokemons />
    </div>
  );
}
