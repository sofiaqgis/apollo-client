const resolvers = {

  Query: {

        photos: async (_, __, {dataSources}) => {
          return dataSources.PetSource.getPhotos();
        },
        photo: async (_, { id }, context) => {
          return context.dataSources.PetSource.getPhoto(id);},
    },
  Mutation: {

  likePhoto: async (_, { input }, { dataSources }) => {
        try {
         const photoT = await dataSources.PetSource.likePhoto(input); 
         return {
         code: 200,
         success: true,
         message: 'Success', 
         photo: photoT
         }
       } catch (err) {
         return {
           code: err.extensions.response.status,
           success: false,
           message: err.extensions.response.body,
           photo: null
         };
       }
     }
  }
 }

export default resolvers;