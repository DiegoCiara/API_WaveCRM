## Guia para rodar o backend.

## # Necessário:
  - Node
  - Yarn ou NPM
  - Banco de dados ( Escolha uma opção das 3, no caso docker ele já vai criar o DB e o usuário, caso do postgres, crie o próprio DB e usuário )
    - Docker/Docker-compose( linux );
    - Docker Desktop ( Win/Mac );
    - PostgreSQL;

## # Seguindo caminho do docker
<sub> Caso não use o docker, substitua o passo dele por criar o DB e usuário no psql: <sub>
  - acesse a pasta do backend via terminal;
  - rode `yarn` ou `npm install`;
  - crie um aquivo na raiz do projeto chamado `.env` copie os valores do `.env.exemple` para ele;
  - rode `docker-compose up -d`;
  - rode `yarn typeorm migration:run`;
  - rode `yarn dev` ou `npm run dev`;
  - acesse `localhost:3333`;
    - SE NECESSÁRIO, PARA REVERTER AS MIGRATIONS, rode `yarn typeorm migration:revert`;
    - SE NECESSÁRIO, PARA DROPAR O DB, rode `yarn typeorm schema:drop` e depois `yarn typeorm migration:run`;

### Criando novas tabelas:
  Alterar arquivos:

  src\app\entities\Contact.ts
  src\database\migrations\1631386637922-createContact.ts
  src\app\controllers\ContactController.ts
  src\utils\dataMock.ts

  - rode `yarn typeorm migration:run`;
