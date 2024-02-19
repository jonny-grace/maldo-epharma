'use client';
import RegisterDoctor from '@/Components/Admin/RegisterDoctor'
import withAuth from '@/Components/auth/withAuth'
import React from 'react'

function page() {
  return (
    <div><RegisterDoctor /></div>
  )
}

export default withAuth(page)