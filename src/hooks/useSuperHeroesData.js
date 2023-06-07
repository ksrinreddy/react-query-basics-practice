import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchRQSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
  // return axios.get("http://localhost:4000/superheroes1");
};

const addSuperHero = (hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchRQSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
