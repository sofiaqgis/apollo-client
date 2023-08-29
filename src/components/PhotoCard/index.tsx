import React from 'react'
import { Img, ImgWrapper, Article } from './styles'

interface PhotoCardProps {
  id: number;
  categoryId: number;
  src: string;
  userId: number;
  likes: number;
}


export const PhotoCard: React.FC<PhotoCardProps> = ({ id, src }) => {

  return (
    <Article key={id}>
            <ImgWrapper>
              <Img width="100%" height="100%" src={src} alt='PhotoCard' />
            </ImgWrapper>
    </Article>
  )
}
