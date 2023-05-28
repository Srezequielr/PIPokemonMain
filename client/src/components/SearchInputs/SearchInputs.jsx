import React, { useEffect, useState } from "react";
import { Grid, IconButton, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchInputs.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { cleanPokemons, getTypes } from "../../redux/actions";

export default function SearchInputs(props) {
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Obtencion de querys de la url
  const query = new URLSearchParams(location.search);
  const searchValue = query.get("search");
  const typeValue = query.get("type");
  const sortValue = query.get("sort");
  ////-------------------------------

  //Estados de inputs
  const [search, setSearch] = useState("");
  const [sortAFL, setSortAFL] = useState("select");
  const [sortPW, setSortPW] = useState("select");
  const [type, setType] = useState("select");
  ////-------------------------------

  //Efecto al montar busca los tipos y setea valores previos en caso se haberlos
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
    if (searchValue) {
      setSearch(searchValue);
    }
    if (typeValue) {
      setType(typeValue);
    }
    if (sortValue) {
      if (sortValue === "AZ" || sortValue === "ZA") {
        console.log(sortValue);
        setSortAFL(sortValue);
        setSortPW("select");
      }
      if (sortValue === "minMax" || sortValue === "maxMin") {
        setSortPW(sortValue);
        setSortAFL("select");
      }
    }
  }, [dispatch, searchValue, typeValue, sortValue]);
  ////-------------------------------

  //contoller del input de busqueda 
  const searchHandler = (event) => {
    const input = event.target.value;
    setSearch(input);
  };
  ////-------------------------------

  //controller de los ordenamientos y redireccionador
  const sortHandler = (event) => {
    const input = event.target.value;
    const name = event.target.name;
    if (name === "sortAlf") {
      setSortAFL(input);
    }
    if (name === "sortPower") {
      setSortPW(input);
    }
    if (searchValue && typeValue) {
      navigate(`?search=${searchValue}&type=${typeValue}&sort=${input}`);
    } else if (searchValue) {
      navigate(`?search=${searchValue}&sort=${input}`);
    } else if (typeValue) {
      navigate(`?type=${typeValue}&sort=${input}`);
    } else {
      navigate(`?sort=${input}`);
    }
    dispatch(cleanPokemons());
  };
  ////-------------------------------

  //controller de tipos de pokemons y redireccionador
  const setTypeHandler = (event) => {
    const input = event.target.value;
    setType(input);
    if (searchValue && sortValue) {
      navigate(`?search=${searchValue}&type=${input}&sort=${sortValue}`);
    } else if (searchValue) {
      navigate(`?search=${searchValue}&type=${input}`);
    } else if (sortValue) {
      navigate(`?type=${input}&sort=${sortValue}`);
    } else {
      navigate(`?type=${input}`);
    }
    dispatch(cleanPokemons());
  };
  ////-------------------------------

  //Buscador y redireccionador
  const searchSubmit = (event) => {
    event.preventDefault();
    if (!search) {
      if (typeValue && sortValue) {
        navigate(`?type=${typeValue}&sort=${sortValue}`);
      } else if (typeValue) {
        navigate(`?type=${typeValue}`);
      } else if (sortValue) {
        navigate(`?sort=${sortValue}`);
      } else {
        navigate("/");
      }
    } else if (sortValue && typeValue) {
      navigate(`?search=${search}&type=${typeValue}&sort=${sortValue}`);
    } else if (sortValue) {
      navigate(`?search=${search}&sort=${sortValue}`);
    } else if (typeValue) {
      navigate(`?search=${search}&type=${typeValue}`);
    } else {
      navigate(`?search=${search}`);
    }
    dispatch(cleanPokemons());
  };
  ////-------------------------------

  return (
    <div
      className={styles.inputsContainer}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Grid spacing={2} container alignItems={"center"}>
        <Grid
          lg={3}
          md={6}
          sm={6}
          xs={12}
          item
          justifyContent={"center"}
          alignItems={"center"}
        >
          <label>
            <IconButton size="large" color="inherit" onClick={searchSubmit}>
              <SearchIcon />
            </IconButton>
            <input
              className={styles.searchInput}
              type="search"
              value={search}
              onChange={searchHandler}
              id="search"
              name="search"
              placeholder="Buscar Pokemon"
            />
          </label>
        </Grid>
        <Grid
          lg={3}
          md={6}
          sm={6}
          xs={12}
          item
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <label htmlFor="OF">Ordenar Alfabeticamente</label>
          <select value={sortAFL} onChange={sortHandler} name="sortAlf" id="OF">
            <option selected disabled value={"select"}>
              Seleccionar orden
            </option>
            <option value={"AZ"}>A - Z</option>
            <option value={"ZA"}>Z - A</option>
          </select>
        </Grid>
        <Grid
          lg={3}
          md={6}
          sm={6}
          xs={12}
          item
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <label htmlFor="OP">Ordenar por poder</label>
          <select
            value={sortPW}
            onChange={sortHandler}
            name="sortPower"
            id="OP"
          >
            <option selected disabled value={"select"}>
              Seleccionar orden
            </option>
            <option value={"minMax"}>Ascendente</option>
            <option value={"maxMin"}>Descendente</option>
          </select>
        </Grid>
        <Grid
          lg={3}
          md={6}
          sm={6}
          xs={12}
          item
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <label htmlFor="type">Seleccionar tipo</label>
          <select
            value={type}
            name="seleccionar tipo"
            id="type"
            onChange={setTypeHandler}
          >
            <option selected disabled value={"select"}>
              Seleccionar Tipo
            </option>
            {types?.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </Grid>
      </Grid>
    </div>
  );
}
