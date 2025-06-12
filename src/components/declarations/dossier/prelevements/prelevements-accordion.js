import {fr} from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

const PrelevementsAccordion = ({idPoint, pointPrelevement, status, isOpen, handleSelect, children}) => (
  <Accordion
    expanded={isOpen}
    onChange={handleSelect}
  >
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Box className='flex justify-between w-full items-center'>
        <Box>
          {pointPrelevement ? (
            <Box>
              <Typography fontWeight='bold' className='flex gap-2'>
                {pointPrelevement.nom}
              </Typography>
              <Typography variant='body2'>
                {idPoint}
              </Typography>
            </Box>
          ) : (
            <Typography fontWeight='bold' className='flex gap-2'>
              <Box component='span' className='fr-icon-warning-fill' sx={{
                color: fr.colors.decisions.text.default.warning.default
              }} />
              {`Le point de prélèvement ${idPoint} n’est pas reconnu`}
            </Typography>
          )}
        </Box>

        <Badge severity={status}>
          {status === 'success' ? 'OK' : 'Anomalie'}
        </Badge>
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
)

export default PrelevementsAccordion
