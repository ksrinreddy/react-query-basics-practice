import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "./styles/Container.styled";
import { Error } from "./styles/Error.styled";
import { Loading } from "./styles/Loading.styled";
import { SuperHeroes } from "./styles/SuperHeroes.styled";

const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchSuperHeroes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/superheroes");
      setData(response.data);
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuperHeroes();
  }, []);

  if (isLoading) {
    return (
      <Loading>
        <h2>Loading...</h2>
      </Loading>
    );
  }

  if (error) {
    return (
      <Error>
        <h4>{error}</h4>
      </Error>
    );
  }

  return (
    <SuperHeroes>
      <Container>
        <h3>Traditional Super Heroes Page</h3>
        {data.map((hero) => {
          return <div key={hero.id}>{hero.name}</div>;
        })}
      </Container>
    </SuperHeroes>
  );
};

export default SuperHeroesPage;
