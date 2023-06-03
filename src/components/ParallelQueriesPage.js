import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Container } from "./styles/Container.styled";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueriesPage = () => {
  const { data: superheroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  return (
    <Container>
      <div>ParallelQueriesPage</div>
    </Container>
  );
};

export default ParallelQueriesPage;
