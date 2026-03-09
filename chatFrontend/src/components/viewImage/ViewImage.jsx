import React, { useState } from 'react'

const ViewImage = ({url}) => {
    const [imageUrl, setImageUrl] = useState(url)
  return (
    <>
    {url && (
        <>
        <img src={imageUrl} alt="" />
        </>
    )}
    </>
  )
}

export default ViewImage