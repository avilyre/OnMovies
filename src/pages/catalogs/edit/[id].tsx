import { Box, Flex, Stack, useMediaQuery, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../../../components/form/Button";
import { Input } from "../../../components/form/Input";
import { PageTemplate } from "../../../components/templates/PageTemplate";
import { useCatalog } from "../../../hooks/useCatalog";
import { Movie } from "../../../hooks/useCatalog/interface";
import { editSchema } from "../../../schemas/edit.schema";
import { getDate } from "../../../utils/date";
import { EditProps, InputTypesProps } from "./interface";

export default function Edit(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  
  const [isMaxWidth420] = useMediaQuery("(max-width: 420px)");
  
  const toast = useToast();
  const { movies } = useCatalog();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [title, setTitle] = useState<InputTypesProps>("");
  const [releaseDate, setReleaseDate] = useState<InputTypesProps>("");
  const [voteAverage, setVoteAverage] = useState<InputTypesProps>("");

  async function editValidate(data: EditProps): Promise<boolean> {
    try {
      await editSchema.validate(data);
      toast({
        title: "Sucesso!",
        description: "Filme editado com sucesso",
        status: "success",
        duration: 3000,
        position: "top-right"
      });
      return true;
    } catch(err) {
      err.errors.forEach(message => {
        toast({
          title: "Oops!",
          description: message,
          status: "error",
          duration: 3000,
          position: "top-right"
        });
      });
      return false;
    }
  }

  function handleSubmitEdit() {
    const data = {
      title,
      releaseDate,
      voteAverage
    } as EditProps;

    const isValidated = editValidate(data);

    if (isValidated) {
      console.log(data);
    }
  }

  useEffect(() => {
    const movieResponse = movies.filter(movie => movie.id === Number(id))[0];

    setMovie(movieResponse);

    setTitle(movie.title);
    setReleaseDate(getDate(movie.releaseDate).getFullYear());
    setVoteAverage(movie.voteAverage);
  }, [id, movie.releaseDate, movie.title, movie.voteAverage, movies]);

  return (
    <PageTemplate
      section={{ title: movie.title }}
      isDetails
    >
      <Flex
        background="gray.800"
        p="8"
        as="form"
        borderRadius={8}
        maxWidth={590}
      >
        <Flex
          height={320}
          width="100%"
          position="relative"
          maxWidth={isMaxWidth420 ? "100%" : 200}
          align="flex-end"
          borderRadius={8}
          textAlign="left"
          backgroundImage={movie.poster}
          backgroundSize="cover"
          transition="0.2s"
          boxShadow="xl"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "dark-lg"
          }}
        >

        </Flex>
        <Box ml="8">
          <Stack spacing="3">
            <Input
              name="title"
              label="Título"
              placeholder="Ex. Um Novo Amanhecer"
              type="text"
              value={title}
              onChange={(field: FormEvent<HTMLInputElement>) => setTitle(field.currentTarget.value)}
            />
            <Input
              name="release-year"
              label="Ano de lançamento"
              placeholder="Ex. 2022"
              type="text"
              value={releaseDate}
              onChange={(field: FormEvent<HTMLInputElement>) => setReleaseDate(field.currentTarget.value)}
            />
            <Input
              name="vote-average"
              label="Nota"
              placeholder="5,60"
              type="number"
              value={voteAverage}
              onChange={(field: FormEvent<HTMLInputElement>) => setVoteAverage(field.currentTarget.value)}
            />
          </Stack>
          <Button onClick={handleSubmitEdit} mt="10">Salvar Alterações</Button>
        </Box>
      </Flex>
    </PageTemplate>
  );
}
