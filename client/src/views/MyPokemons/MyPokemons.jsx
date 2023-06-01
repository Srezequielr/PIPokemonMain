import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPokemons } from "../../redux/actions";
import errorImage from "../../images/errorImage.png";
import { Grid } from "@mui/material";
import Pokemon from "../../components/Pokemon/Pokemon";
import loader from "../../images/loadingGif.gif";

export default function MyPokemons() {
  const dispatch = useDispatch();
  const myPokemons = useSelector((state) => state.myPokemons);
  const { data, error } = myPokemons;
  useEffect(() => {
    dispatch(getMyPokemons());
  }, [dispatch]);

  if (error) {
    return (
      <div>
        <h2>{data}</h2>
        <img
          style={{ width: "300px" }}
          src={errorImage}
          alt="error al cargar los pokemons"
        />
      </div>
    );
  }

  if (data[0] === null) {
    return (
      <div>
        <h2>No se encontraron pokemons</h2>
        <img
          style={{ width: "300px" }}
          src={errorImage}
          alt="error al cargar los pokemons"
        />
      </div>
    );
  }

  if (!data[0]) {
    return <img src={loader} alt="Loading gif" style={{ width: "250px" }} />;
  }

  return (
    <div style={{ margin: "40px" }}>
      <Grid container spacing={3} justifyContent={"center"}>
        {data?.map((pokemon, index) => (
          <Pokemon
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.img}
            types={pokemon.types}
          />
        ))}
      </Grid>
    </div>
  );
}
