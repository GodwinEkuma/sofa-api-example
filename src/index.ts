import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { typeDefs } from './types';
import { resolvers } from './resovers'
import { useSofa, OpenAPI } from 'sofa-api';
import * as swaggerDocument from './swagger.json';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';

const app = express();

app.use(bodyParser.json());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const openApi = OpenAPI({
  schema,
  info: {
    title: 'Sofa API Example',
    version: '1.0.0',
  },
});


app.use('/api',
  useSofa({
    schema,
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: '/api',
      });
    },
  })
);


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

openApi.save(path.join(__dirname, '/swagger.yml'));
openApi.save(path.join(__dirname, '/swagger.json'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 4000;

app.listen(port, () => {
  console.log(`started server on port: ${port}`)
});
