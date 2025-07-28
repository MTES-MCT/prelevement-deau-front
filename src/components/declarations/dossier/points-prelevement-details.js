import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Skeleton} from '@mui/material'
import {Box} from '@mui/system'

import PointsPrelevementsMap from '@/components/map/points-prelevements-map.js'
import SectionCard from '@/components/ui/section-card.js'

const PointsPrelevementDetails = ({pointsPrelevementId, pointsPrelevement, handleClick, disabledPointIds, pointsStatus}) => {
  const pointsNotFound = pointsPrelevementId.filter(id => !pointsPrelevement?.some(point => point.id_point === id))
  const usePlural = pointsNotFound.length > 1
  return (
    <SectionCard title='Points de prélèvement' icon='fr-icon-map-pin-2-line'>
      {pointsPrelevementId.length > 0 ? (
        pointsPrelevement ? (
          <Box className='flex flex-col gap-2'>
            <Alert
              severity='info'
              description={
                <>
                  <b>{pointsPrelevement.length}</b> point{pointsPrelevement.length > 1 ? 's' : ''} de prélèvement identifié{pointsPrelevement.length > 1 ? 's' : ''}
                </>
              }
            />
            <PointsPrelevementsMap
              pointsPrelevement={pointsPrelevement}
              handleClick={handleClick}
              disabledPointIds={disabledPointIds}
              pointsStatus={pointsStatus}
            />

            {pointsNotFound.length > 0 && (
              <Alert
                severity='warning'
                description={
                  usePlural
                    ? `Les points de prélèvement ${pointsNotFound.join(', ')} n’ont pas pu être identifiés.`
                    : `Le point de prélèvement ${pointsNotFound[0]} n’a pas pu être identifié.`
                }
              />
            )}
          </Box>
        ) : (
          <Skeleton variant='rectangular' height={300} />
        )
      ) : (
        <Alert severity='warning' description='Aucun point de prélèvement n’a pu être identifié.' />
      )}
    </SectionCard>
  )
}

export default PointsPrelevementDetails
