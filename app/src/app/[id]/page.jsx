"use client"
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const caracteristicas = {
    people: ["name", "gender", "height", "skin_color", "homeworld"],
}

const Peoplepage=()=>{
    const {id}=useParams();
    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    const MostrandovaloresPeople = async (e) => {
        try {
          const response = await fetch(`https://swapi.dev/api/people/${id}`);
          const result = await response.json();
          result.resource = "people"
          
          const planetResponse = await fetch(result.homeworld);
          const resultPlanet = await planetResponse.json();
          result.homeworld = resultPlanet.name;
          
          console.log(result);
          setData(result);
          setError(false);
        } catch (error) {
          console.log(error);
          setData({});
          setError(true);
        }
      };
      useEffect (() => {
        MostrandovaloresPeople();
      }, []);
    return(
        <>
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

        </>

    );
}

export default Peoplepage