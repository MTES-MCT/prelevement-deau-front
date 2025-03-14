'use client'

import {useState} from 'react'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import {Add} from '@mui/icons-material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Grid2 as Grid
} from '@mui/material'
import {deburr, camelCase} from 'lodash-es'

const ErrorToggleButton = ({onClick}) => (
  <Button
    className='self-end m-4'
    variant='contained'
    endIcon={<Add />}
    onClick={onClick}
  >
    Voir plus
  </Button>
)

const FileValidationErrors = ({errors}) => {
  const [limit, setLimit] = useState(10)

  const declarantErrors = errors.filter(({destinataire}) => destinataire === 'déclarant')
  const administrateurErrors = errors.filter(({destinataire}) => destinataire === 'administrateur')

  return (
    <List disablePadding component='div'>
      {declarantErrors.length > 0 && (
        <div className='flex flex-col'>
          <ListItem style={{paddingLeft: '2rem'}}>
            <Grid display='flex' flex={1} align='center' justifyContent='space-between'>
              <Badge noIcon severity='warning'>
                {`${declarantErrors.length} erreurs déclarant`}
              </Badge>
            </Grid>
          </ListItem>

          {declarantErrors.slice(0, limit).map(error => (
            <ListItem key={`declarant-${camelCase(deburr(error.message))}`} style={{paddingLeft: '3rem'}}>
              <ListItemIcon>
                <ErrorOutlineIcon color='error' />
              </ListItemIcon>
              <ListItemText primary={`${error.message}`} />
            </ListItem>
          ))}

          {declarantErrors.length > limit && (
            <ErrorToggleButton onClick={() => setLimit(limit + 10)} />
          )}
        </div>
      )}

      {administrateurErrors.length > 0 && (
        <>
          <ListItem style={{paddingLeft: '2rem', marginTop: '1rem'}}>
            <Badge noIcon severity='error'>
              {`${administrateurErrors.length} erreurs administrateur`}
            </Badge>
          </ListItem>

          {administrateurErrors.slice(0, limit).map(error => (
            <ListItem key={`admin-${camelCase(deburr(error.message))}`} style={{paddingLeft: '3rem'}}>
              <ListItemIcon>
                <ErrorOutlineIcon color='error' />
              </ListItemIcon>
              <ListItemText primary={`${error.message}`} />
            </ListItem>
          ))}

          {administrateurErrors.length > limit && (
            <ErrorToggleButton onClick={() => setLimit(limit + 10)} />
          )}
        </>
      )}
    </List>
  )
}

export default FileValidationErrors
