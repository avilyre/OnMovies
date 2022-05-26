import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { MovieCard } from "../components/MovieCard";
import { PageTemplate } from "../components/templates/PageTemplate";
import data from "../mocks/movies.json";
import { getDate } from "../utils/date";


export default function Catalogs(): JSX.Element {
  const [isMaxWidth1000] = useMediaQuery("(max-width: 1000px)");
  const [isMaxWidth740] = useMediaQuery("(max-width: 740px)");
  const [isMaxWidth540] = useMediaQuery("(max-width: 540px)");
  const [isMaxWidth420] = useMediaQuery("(max-width: 420px)");

  function getTemplateColumns() {
    let columns = "repeat(5, 1fr)";

    if (isMaxWidth1000) columns = "repeat(4, 1fr)"; 
    if (isMaxWidth740) columns = "repeat(3, 1fr)";
    if (isMaxWidth540) columns = "repeat(2, 1fr)";
    if (isMaxWidth420) columns = "repeat(1, 1fr)";
    
    return columns;
  }

  return (
    <PageTemplate
      section={{
        title: "Top Filmes"
      }}
    >
      <Grid
        templateColumns={getTemplateColumns()}
        gap={6}
      >
        {data.movies.map(movie => (
          <GridItem key={movie.id}>
            <MovieCard
              title={movie.title}
              poster={movie.poster_path}
              releaseDate={String(getDate(movie.release_date).getFullYear())}
              voteAverage={movie.vote_average}
            />
          </GridItem>
        ))}
      </Grid>
    </PageTemplate>
  );
}
