import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { RQSuperHeroes } from "./styles/RQSuperHeroes.styled";

const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);
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
        {data.data.name} - {data.data.alterEgo}
      </Container>
    </RQSuperHeroes>
  );
};

export default RQSuperHeroPage;
