import React, { useState } from 'react'
import { Img, ImgWrapper, Article } from './styles'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Button } from './styles'
import { gql, useMutation } from '@apollo/client'

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

export const PhotoCard: React.FC<PhotoCardProps> = ({ id, src, likes }) => {
  const key = `like-${id}`
 const [liked, setLiked] = useState(false)
  const Icon = liked ? MdFavorite : MdFavoriteBorder
  const [changeLikes] =  useMutation(LIKE_PHOTO)

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

  return (
    <Article>
        <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img width="100%" height="100%" src={src} alt='PhotoCard' />
            </ImgWrapper>
            </a>
            <Button onClick={handleFavClick}>
            <Icon size='32px' />{likes} likes!
            </Button>
    </Article>
  )
}
