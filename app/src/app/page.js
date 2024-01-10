"use client";
import React, { Fragment, useEffect, useState } from "react";
import "./globals.css";
import { object } from "prop-types";

const caracteristicas = {
  people: ["name", "gender", "height", "skin_color", "homeworld"],
  films: ["title", "director", "episode_id", "producer", "release_date"],
  planets: ["climate", "gravity", "diameter", "name", "rotation_period"],
  species: ["classification", "hair_colors", "language", "name", "eye_colors"],
  starships: ["consumables", "length", "name", "starship_class", "MGLT"],
  vehicles: ["consumables", "length", "model", "name", "passengers"],
};

const Home = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [seleccion, setSeleccion] = useState("");
  const [seleccionId, setSeleccionId] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const ObtenerResultados = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/");
      const result = await response.json();

      const opciones = Object.keys(result);

      const resultadoOpciones = opciones.map((item) => {
        return { label: item, url: result[item] };
      });
      console.log(resultadoOpciones);
      setOpcionSeleccionada(resultadoOpciones);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ObtenerResultados();
  }, []);
  const Mostrandovalores = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${seleccion}${seleccionId}`);
      const result = await response.json();
      result.resource = seleccion.split("/").at(-2);
      if (result.resource === "people") {
        const planetResponse = await fetch(result.homeworld);
        const resultPlanet = await planetResponse.json();
        result.homeworld = resultPlanet.name;
      }
      console.log(result);
      setData(result);
      setError(false);
    } catch (error) {
      console.log(error);
      setData({});
      setError(true);
    }
  };

  return (
    <main>
      <div className="container">
        <form onSubmit={Mostrandovalores}>
          <label htmlFor="miSelect">Search For: </label>
          <select
            id="miSelect"
            value={seleccion}
            onChange={(e) => {
              setSeleccion(e.target.value);
            }}
          >
            {opcionSeleccionada.map((item, index) => {
              return (
                <option value={item.url} key={index}>
                  {item.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="in">Id </label>
          <input
            type="text"
            id="in"
            value={seleccionId}
            onChange={(e) => {
              setSeleccionId(e.target.value);
            }}
          />
          <button className="btn">Search</button>
        </form>
      </div>
      <hr />

      {Object.keys(data).length > 0
        ? caracteristicas[data.resource].map((valor, indice) => (
            <h1 key={indice}>
              {valor}:{data[valor]}
            </h1>
          ))
        : null}

      {error && (
        <Fragment>
          <h1>Estos no son los droides que está buscando</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/c/c5/Obiwan1.jpg"
            alt="obi"
          ></img>
        </Fragment>
      )}
    </main>
  );
};

export default Home;
