import React, { useEffect, useState } from "react";
import styles from "./CreatePokemon.module.css";
import { Grid, Hidden, IconButton, useTheme } from "@mui/material";
import ashImage from "./../../images/ash.png";
import pokemonLogo from "./../../images/pokemonLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPolkemon } from "../../redux/actions";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export default function CreatePokemon() {
  const theme = useTheme();
  const dispatch = useDispatch();

  //Estado del formulario a enviar
  const [form, setForm] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    types: [],
  });
  //----------------------------------

  //Tipos de pokemon y disparo la accion para obtenerlos
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  //----------------------------------

  //Actualizo el estado del formulario
  const changeHandler = (event) => {
    const pointer = event.target.name;
    const data = event.target.value;
    setForm({ ...form, [pointer]: data });
  };
  //----------------------------------

  //Actualizo la propiedad types
  const typesHandler = (event) => {
    const data = event.target.value;
    setForm({
      ...form,
      types: [...form.types, data],
    });
  };
  //----------------------------------

  //Elimino un tipo del formulario
  const deleteType = (pointer) => {
    setForm({
      ...form,
      types: form.types.filter((type) => type !== pointer),
    });
  };
  //----------------------------------

  //Envio del formulario
  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name) {
      alert("Debe Insertar un nombre");
    } else if (
      !form.attack ||
      !form.defense ||
      !form.height ||
      !form.hp ||
      !form.weight ||
      !form.speed
    ) {
      alert("Falta alguna estadistica");
    } else if (form.types.length === 0) {
      alert("Debe insertar al menos un tipo");
    } else {
      dispatch(postPolkemon(form));
      alert("Pokemon creado correctamente");
      setForm({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        weight: "",
        height: "",
        types: [],
      });
    }
  };
  //----------------------------------

  //Dispara una alerta si el usuario cargo algun dato
  useEffect(() => {
    if (
      form.name ||
      form.attack ||
      form.defense ||
      form.height ||
      form.hp ||
      form.speed ||
      form.weight ||
      form.types.length > 0
    ) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = ""; // Chrome necesita que se establezca el valor de returnValue
      };

      window.onbeforeunload = handleBeforeUnload;

      return () => {
        window.onbeforeunload = null; // Limpiar la función antes de desmontar el componente
      };
    }
  }, [form]);
  //----------------------------------

  return (
    <div
      style={{ backgroundColor: theme.palette.primary.main }}
      className={styles.createContainer}
    >
      <Hidden mdUp>
        <img
          className={styles.createImage}
          src={pokemonLogo}
          alt="pokemon logo"
        />
      </Hidden>
      <h2>¿Encontraste un Pokemon?</h2>
      <h3>¡Guardalo aqui!</h3>
      <Grid spacing={2} container>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Grid spacing={3} container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className={styles.inputsContainer}>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <div className={styles.inputsContainer}>
                <label htmlFor="attack">Ataque</label>
                <input
                  type="number"
                  name="attack"
                  id="attack"
                  value={form.attack}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <div className={styles.inputsContainer}>
                <label htmlFor="defense">Defensa</label>
                <input
                  type="number"
                  name="defense"
                  id="defense"
                  value={form.defense}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <div className={styles.inputsContainer}>
                <label>Vida</label>
                <input
                  type="number"
                  name="hp"
                  id="hp"
                  value={form.hp}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <div className={styles.inputsContainer}>
                <label htmlFor="speed">Velocidad</label>
                <input
                  type="number"
                  name="speed"
                  id="speed"
                  value={form.speed}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <div className={styles.inputsContainer}>
                <label htmlFor="weight">Peso</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={form.weight}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <div className={styles.inputsContainer}>
                <label htmlFor="height">Altura</label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={form.height}
                  onChange={changeHandler}
                />
              </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h4>Seleccionar tipos</h4>
              <div
                className={styles.inputsContainer}
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Grid container alignItems={"center"} spacing={1}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div>
                      <label>Tipos</label>
                      <select
                        value={form.types[0]}
                        disabled={form.types.length === 2}
                        name="type1"
                        id="0"
                        onChange={typesHandler}
                      >
                        <option disabled value={""}>
                          Seleccionar
                        </option>
                        {types?.map((type, index) => (
                          <option value={type.id} key={index}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Grid
                      container
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      {form.types?.map((type) => (
                        <Grid
                          item
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          justifyContent={"center"}
                          key={type}
                        >
                          <div className={styles.type}>
                            <IconButton
                              size="small"
                              color="inherit"
                              onClick={() => deleteType(type)}
                            >
                              <ClearOutlinedIcon />
                            </IconButton>
                            <span>{types[type - 1]?.name}</span>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div>
                <button onClick={submitHandler} className={styles.createButton}>
                  Crear Pokemon
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <img
              className={styles.createImage}
              src={ashImage}
              alt="Ash Ketchum"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
