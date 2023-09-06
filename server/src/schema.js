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
    photo(id: ID!): Photo
  }

  type Mutation {
    likePhoto(input: LikePhoto!): likePhotoResponse!
  }

  type likePhotoResponse {
    code: Int!
    success: Boolean!
    message: String!
    photo: Photo
  }

  input LikePhoto {
    id: ID!
    action: String!
  }

`;

export default typeDefs;