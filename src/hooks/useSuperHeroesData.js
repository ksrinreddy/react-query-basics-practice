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
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   // console.log(data);
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
    //   });
    // },

    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
