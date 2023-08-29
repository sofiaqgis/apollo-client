import { gql } from "graphql-tag";

const typeDefs = gql`

type Photo {
  id: ID!
  categoryId: Int
  src: String
  userId: ID
  likes: Int
}

  type Query {
    photos: [Photo!]!
  }

`;

export default typeDefs;