import axios from "axios";
import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { Container } from "./styles/Container.styled";
import { StyledError } from "./styles/Error.styled";
import { StyledPaginatedQueries } from "./styles/PaginatedQueries.styled";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );
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
    <StyledPaginatedQueries>
      <Container>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h4>
                {color.id}. {color.label}
              </h4>
            </div>
          );
        })}
        <div>
          <button
            onClick={() => setPageNumber((page) => page - 1)}
            disabled={pageNumber === 1}
          >
            prev page
          </button>
          <button
            onClick={() => setPageNumber((page) => page + 1)}
            disabled={pageNumber === 4}
          >
            next page
          </button>
        </div>
        {isFetching && "Loading"}
      </Container>
    </StyledPaginatedQueries>
  );
};

export default PaginatedQueriesPage;
