import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { RQSuperHeroes } from "./styles/RQSuperHeroes.styled";

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

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
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
