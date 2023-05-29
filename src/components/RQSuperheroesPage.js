import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { RQSuperHeroes } from "./styles/RQSuperHeroes.styled";

const fetchRQSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes1");
};

const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    fetchRQSuperHeroes
  );
  // console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <StyledError>
        <h4>{error.message}</h4>
      </StyledError>
    );
  }
  return (
    <RQSuperHeroes>
      <Container>
        <h3>RQ Super Heroes Page</h3>
        {data?.data.map((hero) => {
          return <div key={hero.id}>{hero.name}</div>;
        })}
      </Container>
    </RQSuperHeroes>
  );
};

export default RQSuperHeroesPage;
