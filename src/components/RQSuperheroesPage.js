import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { RQSuperHeroes } from "./styles/RQSuperHeroes.styled";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("perform side effect after fetching data", data);
  };

  const onError = (error) => {
    console.log("perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
  // console.log(data);
  // console.log({ isLoading, isFetching });

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

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
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={alterEgo}
            onChange={(e) => setAlterEgo(e.target.value)}
          />
          <button onClick={handleAddHeroClick}>add hero</button>
        </div>
        <button onClick={refetch}>fetch heroes</button>
        {data?.data.map((hero) => {
          return (
            <div key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
          );
        })}
      </Container>
    </RQSuperHeroes>
  );
};

export default RQSuperHeroesPage;
