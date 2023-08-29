const resolvers = {

  Query: {

        photos: async (_, __, {dataSources}) => {
          return dataSources.PetSource.getPhotos();
        }
    }
 }

export default resolvers;