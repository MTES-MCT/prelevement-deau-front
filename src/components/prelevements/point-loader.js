'use client'

import {useState, useEffect} from 'react'

import {Box, CircularProgress} from '@mui/material'
import dynamic from 'next/dynamic'

import {getPointPrelevement} from '@/app/api/points-prelevement.js'

const PointIdentification = dynamic(
  () => import('@/components/prelevements/point-identification.js')
)
const PointLocalistation = dynamic(
  () => import('@/components/prelevements/point-localisation.js')
)
const PointExploitations = dynamic(
  () => import('@/components/prelevements/point-exploitations.js')
)

const PointLoader = ({id, selectedTab}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [pointPrelevement, setPointPrelevement] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pointData = await getPointPrelevement(id)

        setPointPrelevement(pointData)
        setIsLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (isLoading) {
    return (
      <Box className='flex w-full justify-center'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      {selectedTab === 'identification' && (
        <PointIdentification pointPrelevement={pointPrelevement} />
      )}
      {selectedTab === 'localisation' && (
        <PointLocalistation pointPrelevement={pointPrelevement} />
      )}
      {selectedTab === 'exploitations' && (
        <PointExploitations pointPrelevement={pointPrelevement} />
      )}
    </>
  )
}

export default PointLoader
