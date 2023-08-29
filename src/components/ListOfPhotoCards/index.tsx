import React from 'react'
import { PhotoCard } from '../PhotoCard/index'
import { useQuery, gql } from '@apollo/client'

interface Photo {
  id: number;
  categoryId: number;
  src: string;
  userId: number;
  likes: number;
}

const ANIMALS_QUERY = gql`
query Photos {
  photos {
    id
    categoryId
    src
    userId
    likes
  }
}
`

export const ListOfPhotoCards = () => {

const { data } = useQuery(ANIMALS_QUERY);

if (!data || !data.photos) {
  return null
}

  return (
    <ul>
    {data.photos.map((photo: Photo) => (
      <li key={photo.id}>
        <PhotoCard {...photo} />
      </li>
    ))}
  </ul>
  )
}