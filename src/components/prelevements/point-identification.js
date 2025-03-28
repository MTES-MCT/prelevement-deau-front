import {useState, useEffect} from 'react'

import Article from '@mui/icons-material/Article'
import Launch from '@mui/icons-material/Launch'
import {Box, Typography} from '@mui/material'
import Link from 'next/link'

import {getBnpe, getBss} from '@/app/api/points-prelevement.js'
import {formatAutresNoms} from '@/lib/points-prelevement.js'

const PointIdentification = ({pointPrelevement}) => {
  const [lienBss, setLienBss] = useState()
  const [lienBnpe, setLienBnpe] = useState()
  const {id_point: idPoint, nom, autres_noms: autresNoms} = pointPrelevement

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const bss = await getBss(pointPrelevement.id_bss)
        const bnpe = await getBnpe(pointPrelevement.code_bnpe)

        setLienBss(bss?.lien_infoterre || '')
        setLienBnpe(bnpe?.uri_ouvrage || '')
      } catch (error) {
        console.error(error)
      }
    }

    fetchInfos()
  }, [pointPrelevement])

  return (
    <Box sx={{m: 2, p: 3}}>
      <Typography
        gutterBottom
        variant='h3'
      >
        {idPoint} - {nom}
      </Typography>
      {autresNoms && (
        <div><i>{formatAutresNoms(autresNoms)}</i></div>
      )}
      {lienBss && (
        <Box sx={{mt: 2}}>
          <Article sx={{m: 1}} />
          <b>Fiche BSS InfoTerre : </b>
          <Link sx={{m: 2}} href={lienBss}>{lienBss}</Link>
          <Launch sx={{ml: 1}} />
        </Box>
      )}
      {lienBnpe && (
        <Box>
          <Article sx={{m: 1}} />
          <b>Fiche ouvrage BNPE : </b>
          <Link sx={{m: 2}} href={lienBnpe}>{lienBnpe}</Link>
          <Launch sx={{ml: 1}} />
        </Box>
      )}
    </Box>
  )
}

export default PointIdentification
