import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@material-ui/core";
import queryString from "query-string";
import { searchMovie } from "../../redux/actions/search";
import { isLoading, movieResults } from "../../redux/selectores/index";

export default ({ location }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => movieResults(state));
  useEffect(() => {
    const { nameMovie } = queryString.parse(location.search);
    if (nameMovie && !movies) {
      dispatch(searchMovie({ nameMovie }));
    }
  });

  return (
    <Container>
      <Typography variant='h3'>Resultado</Typography>
      <ul>
        {movies.map((movie) => (
          <li>{movie.Title}</li>
        ))}
      </ul>
    </Container>
  );
};
