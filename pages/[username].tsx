import React from 'react'
import { NextRouter, useRouter } from "next/router";
const ProfilePage = () => {
  const router: NextRouter = useRouter();
  const { username } = router.query;
  return (
    <div>
      
    </div>
  )
}

export default ProfilePage
