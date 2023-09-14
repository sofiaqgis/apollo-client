import { initializeApollo, addApolloState, ApolloWrapper } from "../../app/client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";
import React, { useState } from 'react'
import { Img, ImgWrapper, Article } from './../../components/PhotoCard/styles'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Button } from '../../components/PhotoCard/styles'

  const QUERY_PHOTO = gql`
  query Photo($photoId: ID!) {
    photo(id: $photoId) {
      id
      categoryId
      src
      userId
      likes
    }
  }
  `

  interface PhotoCardProps {
    id: number;
    categoryId: number;
    src: string;
    userId: number;
    likes: number;
  }

  const LIKE_PHOTO = gql`
mutation LikePhoto($input: LikePhoto!) {
  likePhoto(input: $input) {
    code
    success
    message
    photo {
      likes
      id
    }
  }
}
`

   export async function getStaticPaths() {
    return {
      paths: [], // Leave it empty since you want to generate paths dynamically
      fallback: "blocking", // Set fallback to "blocking" to enable dynamic static generation
    };
  }

  export async function getStaticProps(context: GetStaticPropsContext) {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: QUERY_PHOTO,
      variables: {
        photoId: context.params!.id,
      },
    });

    return addApolloState(apolloClient, {
      props: {
        id: context.params!.id,
        photo: data.photo, // Add the fetched photo data to the props
      },
    });
  }

  export function PhotoPage({id}:{photo:PhotoCardProps, id:number}) {
    const key = `like-${id}`
    const [liked, setLiked] = useState(false)
     const Icon = liked ? MdFavorite : MdFavoriteBorder
     const [changeLikes] =  useMutation(LIKE_PHOTO)

     const {data} = useQuery(QUERY_PHOTO, {
      variables: {
        photoId: id,
      },
      fetchPolicy: "cache-only",
     });


     const {photo} = data ? data : {photo: null};

     const handleFavClick = async () => {
       const newAction = liked ? "unlike" : "like";
       try {
         if (!liked) {
           setLiked(true);
         } else {
           setLiked(false);
         }
       changeLikes({
         variables: {
           input: {
             id: id,
             action: newAction
           },
         },
       });
     } catch (err) {
       console.error('Error occurred while registering user:', err);
     }
     };

    if (!photo) {
      return <div>Loading...</div>; // Handle the case when the photo data is not available yet
    }


    return (
        <Article>
            <a href={`/detail/${id}`}>
              <ImgWrapper>
                <Img width='100%' src={photo.src} alt='PhotoCard' />
              </ImgWrapper>
            </a>
            <Button onClick={handleFavClick}>
            <Icon size='32px' />{photo.likes} likes!
            </Button>
      </Article>
    )
  }

function ShowPage({ photo, id, ...rest }: { photo: PhotoCardProps, id: number }) {
    return(
      <ApolloWrapper pageProps={rest}>
    {photo &&
      <PhotoPage photo={photo} id={id}/>
 }
  </ApolloWrapper>
    )
  }

export default ShowPage