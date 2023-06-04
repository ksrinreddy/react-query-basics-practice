import axios from "axios";
import React from "react";
import { useQueries } from "react-query";
import { Container } from "./styles/Container.styled";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queryResults });
  return (
    <Container>
      <div>DynamicParallelPage</div>
    </Container>
  );
};

export default DynamicParallelPage;
