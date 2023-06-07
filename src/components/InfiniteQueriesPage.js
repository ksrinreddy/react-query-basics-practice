import axios from "axios";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { StyledInfitniteQueries } from "./styles/InfinteQueries.styled";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <StyledError>
        <Container>
          <h4>{error.message}</h4>
        </Container>
      </StyledError>
    );
  }

  return (
    <StyledInfitniteQueries>
      <Container>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((color) => {
                return (
                  <h4 key={color.id}>
                    {color.id}. {color.label}
                  </h4>
                );
              })}
            </Fragment>
          );
        })}
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </Container>
    </StyledInfitniteQueries>
  );
};

export default InfiniteQueriesPage;
