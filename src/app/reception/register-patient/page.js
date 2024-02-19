'use client';

import withAuth from '@/Components/auth/withAuth'
import PatientRegistration from '@/Components/reception/PatientRegistration'
import React from 'react'

function page() {
  return (
    <div>
        <PatientRegistration />
    </div>
  )
}

export default withAuth(page)