import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { RQSuperHeroes } from "./styles/RQSuperHeroes.styled";

const fetchRQSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
  // return axios.get("http://localhost:4000/superheroes1");
};

const RQSuperHeroesPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000);
  const onSuccess = (data) => {
    console.log("perform side effect after fetching data", data);
    // if (data.data.length === 4) {
    //   setRefetchInterval(false);
    // }
  };

  const onError = (error) => {
    console.log("perform side effect after encountering error", error);
    setRefetchInterval(false);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchRQSuperHeroes,
    {
      // cacheTime: 5000,
      // staleTime: 30000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: refetchInterval,
      // refetchIntervalInBackground: true,
      // enabled: false,
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );
  // console.log(data);
  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
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
        <button onClick={refetch}>fetch heroes</button>
        {/* {data?.data.map((hero) => {
          return <div key={hero.id}>{hero.name}</div>;
        })} */}
        {data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>;
        })}
      </Container>
    </RQSuperHeroes>
  );
};

export default RQSuperHeroesPage;
