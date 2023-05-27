import { Grid, Link, useTheme } from "@mui/material";
import React from "react";
import styles from "./Pokemon.module.css";

export default function Pokemon({ img, name, types, id }) {
  const theme = useTheme();
  // console.log(name, img, types, id);
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Link href={`pokemon/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{ backgroundColor: theme.palette.primary.main }}
          className={styles.cardContainer}
        >
          <div className={styles.imgContainer}>
            <img className={styles.pokeImage} src={img} alt={name} />
          </div>
          <div className={styles.contentContaner}>
            <p className={styles.title}>{name}</p>
            <div>
              <p className={styles.text}>Tipos:</p>
              <Grid container justifyContent={"center"}>
                {types?.map((type, index) => (
                  <Grid key={index} item md={4}>
                    <p className={styles.text} key={index}>
                      {type}
                    </p>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );
}
