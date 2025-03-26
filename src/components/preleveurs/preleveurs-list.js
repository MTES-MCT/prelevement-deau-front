'use client'

import {useEffect, useRef, useState} from 'react'

import {fr} from '@codegouvfr/react-dsfr'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Chip,
  InputAdornment,
  TextField
} from '@mui/material'
import Link from 'next/link'

import FlexSearch from '../../../node_modules/flexsearch/dist/flexsearch.bundle.module.min.js'

import {getUsagesColors} from '@/components/map/legend-colors.js'

const PreleveursList = ({preleveurs}) => {
  const [filteredPreleveurs, setFilteredPreleveurs] = useState(preleveurs)
  const index = useRef(null)

  useEffect(() => {
    index.current = new FlexSearch.Document({
      document: {
        id: 'id_beneficiaire',
        index: ['nom', 'prenom', 'raison_sociale', 'sigle'],
        store: true
      }
    })

    for (const preleveur of preleveurs) {
      index.current.add(
        preleveur.id_beneficiaire,
        {
          idBeneficiaire: preleveur.id_beneficiaire.toString(),
          nom: preleveur.nom?.toLowerCase(),
          prenom: preleveur.prenom?.toLowerCase(),
          raison_sociale: preleveur.raison_sociale?.toLowerCase(), // eslint-disable-line camelcase
          sigle: preleveur.sigle?.toLowerCase()
        }
      )
    }

    setFilteredPreleveurs(preleveurs)
  }, [preleveurs])

  const handleFilter = e => {
    const results = index.current.search(e.target.value.toLowerCase())
    const newPreleveurs = []

    if (results.length > 0) {
      for (const r of results) {
        const {result} = r
        for (const r of result) {
          const newPreleveur = preleveurs.find(p => p.id_beneficiaire === r)
          newPreleveurs.push(newPreleveur)
        }
      }

      setFilteredPreleveurs(newPreleveurs)
    } else {
      setFilteredPreleveurs(preleveurs)
    }
  }

  return (
    <Box className='flex flex-col gap-2 mt-8 w-full'>
      <TextField
        label='Chercher un préleveur'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }
        }}
        onChange={handleFilter}
      />
      {filteredPreleveurs.map((preleveur, index) => (
        <Box
          key={preleveur.id_beneficiaire}
          className='fr-p-2w flex justify-between items-center flex-wrap'
          sx={{
            backgroundColor: index % 2 === 0 ? fr.colors.decisions.background.default.grey.default : fr.colors.decisions.background.alt.blueFrance.default
          }}
        >
          <Link href={`preleveurs/${preleveur.id_beneficiaire}`}>
            <span>{preleveur.id_beneficiaire} - </span>
            <span>{preleveur.civilite} {preleveur.nom} {preleveur.prenom} {preleveur.sigle} {preleveur.raison_sociale}</span>
          </Link>
          <div className='fr-mt-1w'>
            <b>Usages : </b>
            {preleveur.usages && preleveur.usages.length > 0 && preleveur.usages.map(u => (
              <Chip
                key={`${u}`}
                label={u}
                sx={{
                  ml: 1,
                  backgroundColor: getUsagesColors(u)?.color,
                  color: getUsagesColors(u)?.textColor
                }}
              />
            ))}
          </div>
        </Box>
      ))}
    </Box>
  )
}

export default PreleveursList
