import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileISideBar from './MobileISideBar'

const Navbar = () => {
  return (
    <div className='flex items-center p-4'>

        <MobileISideBar></MobileISideBar>


        <div className='flex w-full justify-end'>
            <UserButton afterSignOutUrl='/'></UserButton>
        </div>


    </div>
  )
}

export default Navbar