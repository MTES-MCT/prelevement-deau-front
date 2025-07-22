'use client'

import {fr} from '@codegouvfr/react-dsfr'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import Tag from '@codegouvfr/react-dsfr/Tag'
import {
  Box, Divider,
  Typography
} from '@mui/material'

import ParameterTrendChart from '@/components/declarations/dossier/prelevements/parameter-trend-chart.js'
import FileValidationErrors from '@/components/declarations/file-validation-errors.js'
import PrelevementsCalendar from '@/components/declarations/prelevements-calendar.js'

const Spreadsheet = ({moisDeclaration, storageKey = '', data = {}, errors, typePrelevement = 'aep-zre', downloadFile}) => {
  const [, ...filename] = storageKey.split('-')

  // Vérifie si les dates de prélèvement (minDate / maxDate) se situent dans le mois déclaré
  const isInDeclarationMonth = date => {
    const declarationDate = new Date(moisDeclaration)
    const d = new Date(date)
    return d.getMonth() === declarationDate.getMonth()
           && d.getFullYear() === declarationDate.getFullYear()
  }

  const {minDate, maxDate} = data

  const hasDatesOutsideDeclMonth = (() => {
    if (!minDate || !maxDate || !moisDeclaration) {
      return false
    }

    return !isInDeclarationMonth(minDate) || !isInDeclarationMonth(maxDate)
  })()

  return (
    <Box className='flex flex-col gap-6'>
      {data && (
        <>
          <Box className='flex flex-col gap-4'>
            <Divider textAlign='left'>
              Paramètres par pas de temps
            </Divider>

            <Box className='flex flex-col gap-2'>
              {data.dailyParameters && (
                <Box className='flex flex-wrap gap-1 items-center'>
                  Journalier : {data.dailyParameters.map(param => (
                    <Tag key={param.paramIndex} sx={{m: 1}}>
                      {param.nom_parametre} ({param.unite})
                    </Tag>
                  ))}
                </Box>
              )}

              {data.fifteenMinutesParameters && (
                <Box className='flex flex-wrap gap-1 items-center'>
                  Quinze minutes : {data.fifteenMinutesParameters.map(param => (
                    <Tag key={param.paramIndex} sx={{m: 1}}>
                      {param.nom_parametre} ({param.unite})
                    </Tag>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          <Box className='flex flex-col gap-4'>
            <Divider textAlign='left'>
              Calendrier des prélèvements
            </Divider>

            {hasDatesOutsideDeclMonth && (
              <Alert
                severity='warning'
                className='mb-2'
                description={
                  <>
                    Certaines dates de prélèvement ne sont pas situées dans le mois déclaré : {new Intl.DateTimeFormat('fr-FR', {month: 'long', year: 'numeric'}).format(new Date(moisDeclaration))}
                  </>
                }
              />
            )}

            <PrelevementsCalendar data={data} />
            <ParameterTrendChart data={data} connectNulls={typePrelevement === 'camion-citerne'} />
          </Box>
        </>
      )}

      {errors && (
        <FileValidationErrors errors={errors} />
      )}

      {downloadFile && storageKey && (
        <Box className='flex flex-wrap justify-between mt-4'>
          <Box className='flex flex-col p-2'>
            <Typography>
              <Box component='span' className='pr-1' sx={{color: fr.colors.decisions.text.label.blueFrance.default}} />
              {filename.join('-')}
            </Typography>
          </Box>

          <Button
            variant='contained'
            iconId='fr-icon-download-line'
            onClick={() => downloadFile(storageKey)}
          >
            Télécharger
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Spreadsheet
