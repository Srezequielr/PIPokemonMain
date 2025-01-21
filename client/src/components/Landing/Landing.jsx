import React from "react";
import styles from "./Landing.module.css";
import pikachu from "./../../images/pikachu.png";
import { Grid } from "@mui/material";

export default function Landing(props) {
  return (
    <div className={styles.landingContainer}>
      <Grid container>
        <Grid xs={12} md={6} item>
          <div className={styles.articleContainer}>
            <h1 className={styles.title}>¡Bienvenido a tu PokeApp!</h1>
            <p className={styles.article}>
              Aquí podrás consultar una amplia lista de Pokémons que te ayudarán
              a convertirte en el mejor entrenador que se haya visto en mucho
              tiempo, ¡y podrás agregar a los que vayas descubriendo!
            </p>
          </div>
        </Grid>
        <Grid md={6} xs={12} item className={styles.imageContainer}>
          <img className={styles.image} src={pikachu} alt="Pokemon Pikachu" />
        </Grid>
      </Grid>
    </div>
  );
}
