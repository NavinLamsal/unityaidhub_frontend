'use server'

import { auth } from '@/auth'
import React from 'react'
import DropDownUser from './DropDownUser';
import LoggedDropDown from './LoggedDropDown';

async function UserDropdown() {
    const session = await auth();
    
  return (
    <>{session ? <LoggedDropDown/>:<DropDownUser/>
    }
      
    </>
  )
}

export default UserDropdown
