## Como inicializar o projeto

1. Clone o repositório na sua máquina.

2. No caminho `sistematizacao-web/back`, crie um arquivo `.env` e adicione a seguinte variável:

   ```
   DB=postgres://postgres:postgres@postgres:5432/postgres?search_path=sistematizacao-web
   ```

3. No caminho `sistematizacao-web/front`, crie um arquivo `.env` e adicione a seguinte variável:

   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. Se ainda não possuir o Docker e o Docker Compose, instale-os: [Docker](https://docs.docker.com/get-docker/) | [Docker Compose](https://docs.docker.com/compose/)

5. Com o terminal no caminho `sistematizacao-web`, execute o comando:

   ```
   docker compose up
   ```

6. Execute o comando `docker ps -a` para listar os contêineres que estão rodando no Docker e copie o ID do contêiner da imagem do PostgreSQL.

7. Execute o comando:

   ```
   docker cp ./back/dump-postgres.sql ID_CONTEINER_POSTGRES:postgres.sql
   ```

   Isso irá copiar o backup do banco de dados do seu computador para o contêiner do banco de dados.

8. Execute o comando:

   ```
   docker exec -it ID_IMAGEM bash
   ```

   para poder executar comandos dentro do contêiner selecionado utilizando o terminal bash.

9. Execute o comando:

   ```
   psql -U postgres -d postgres < postgres.sql
   ```

   para restaurar o dump do banco de dados dentro do banco de dados de nome `postgres` dentro do contêiner.

10. Acesse o front-end da aplicação com [http://localhost:5000](http://localhost:5000)
