import {Person, WaterDropOutlined} from '@mui/icons-material'
import {
  Box,
  Chip,
  Typography,
  useTheme
} from '@mui/material'
import {format} from 'date-fns'
import {orderBy} from 'lodash-es'

import {formatAutresNoms} from '@/lib/points-prelevement.js'

const Popup = ({point}) => {
  const theme = useTheme()
  const {nom, autres_noms: autresNoms, beneficiaires, exploitations, usages, typeMilieu, zre, reservoir_biologique: reservoirBiologique} = point
  const orderedExploitations = orderBy(exploitations, 'date_debut')
  const statutExploitation = orderedExploitations.at(-1).statut
  const dateDebutExploitation = orderedExploitations[0].date_debut

  return (
    // TODO : Utiliser le theme DSFR
    <Box className='flex flex-col gap-2' sx={{color: theme.palette.text.primary}}>
      <Typography variant='h6' sx={{color: theme.palette.text.primary}}>
        {point.id_point} - {nom || 'Pas de nom renseigné'}
      </Typography>

      <Typography variant='caption'>
        {autresNoms && formatAutresNoms(autresNoms)}
      </Typography>

      <Box>
        {beneficiaires.length > 0 ? (
          beneficiaires.length < 4 ? (
            beneficiaires.map(beneficiaire => (
              <Box key={beneficiaire.id_beneficiaire} className='flex items-center gap-1'>
                <Person /> {beneficiaire?.raison_sociale || beneficiaire?.sigle || beneficiaire?.nom}
              </Box>
            ))
          ) : (
            <Box className='flex items-center gap-1'>
              <Person /> {beneficiaires.length} préleveurs
            </Box>
          )
        ) : (
          <Typography variant='caption'>Aucun préleveur</Typography>
        )}
      </Box>

      <Box>
        {orderedExploitations.length > 0 && (
          <>
            <Box className='flex items-center gap-1'>
              <WaterDropOutlined />Statut de l’exploitation : {statutExploitation || 'non renseigné'}
            </Box>
            <Box className='flex items-center gap-1'>
              Exploité depuis le {format(dateDebutExploitation, 'dd/MM/yyyy')}
            </Box>
            <Box>
              Zonage réglementaire : <Typography variant='caption' display='inline'>
                {zre ? 'Zone de répartition des eaux' : (reservoirBiologique ? 'Réservoir biologique' : ' - ')}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      <Box className='flex flex-col gap-1'>
        <Box className='flex gap-1'>
          {usages.map(usage => (
            <Chip
              key={usage}
              label={usage}
              size='small'
              variant='outlined' />
          ))}
        </Box>
        <Chip label={typeMilieu} size='small' />
      </Box>
    </Box>
  )
}

export default Popup
