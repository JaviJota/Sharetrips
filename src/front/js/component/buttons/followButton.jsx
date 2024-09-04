import React from 'react'
import { useState } from 'react'
import "../../../styles/followButton.css"

const FollowButton = ({ id }) => {
    const [isFollowing, setIsFollowing] = useState(false)

    const handleClick = async () => {
      console.log(JSON.parse(localStorage.getItem('user')))
      const user = JSON.parse(localStorage.getItem('user'));

      try {
        const resp = await fetch(process.env.BACKEND_URL + '/api/followers', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            accept : 'application/json'
          },
          body: JSON.stringify({
            following_user_id: user.id,
            followed_user_id: id
          })
        });
        const data = await resp.json()

        if (!resp.ok) {
          const errorMsg = data.msg
          throw  new Error(errorMsg);
        }
        console.log('usuario seguido', data)
        setIsFollowing(true)
      } catch (error) {
        console.error('Error following user:', error.message);
      }
    }
    const buttonClassName = isFollowing ? "custom-button rounded-pill py-2 px-3 followed" : "custom-button rounded-pill py-2 px-3"
  return (
    <>
     <button
     className={buttonClassName}
     onClick={handleClick}>
        {isFollowing ? "Siguiendo" : "Seguir"}
     </button>
    </>
  )
}

export default FollowButton