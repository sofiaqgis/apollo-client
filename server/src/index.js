import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import PetSource from "./data.cjs";

async function startApolloServer() {
  const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    })

     const { url } = await startStandaloneServer(server, {
      context: async () => {
        const { cache } = server;  
  

     return {
       dataSources: {
         PetSource: new PetSource({ cache }),
       }
     };
    }
    })
       

    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }

  
  startApolloServer();

  


