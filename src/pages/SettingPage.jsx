import React from 'react'
import Account from '../components/Setting/Account'
import AdminSettings from '../components/Setting1/AdminSettings'

const SettingPage = () => {
  return (
    <section className=' h-[730px] overflow-y-auto  max-w-8xl px-4 py-6'>
   {/* <Account /> */}
   <AdminSettings />
   </section>
  )
}

export default SettingPage