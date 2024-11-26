'use client'

import React, {useState} from 'react'

import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {PasswordInput} from '@codegouvfr/react-dsfr/blocks/PasswordInput'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {Typography} from '@mui/material'
import {signIn} from 'next-auth/react'

const LoginPage = ({searchParams}) => {
  const params = React.use(searchParams)
  const [input, setInput] = useState('')

  const handleChange = event => {
    const {value} = event.target
    setInput(value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await signIn('credentials', {
      password: input,
      callbackUrl: '/'
    })
  }

  return (
    <div className='flex flex-1 flex-col justify-center p-6'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-3' onSubmit={handleSubmit}>
          <Typography variant='h2'>Se connecter</Typography>
          <div className='mt-2'>
            <PasswordInput
              required
              className={params.error && 'fr-input-group--error'}
              id='password'
              label='Mot de passe'
              name='password'
              value={input || ''}
              onChange={handleChange}
            />
          </div>

          <Button
            type='submit'
            className='w-full justify-center'
          >
            Se connecter
          </Button>

          {params.error && (
            <Alert
              small
              description='Le mot de passe est incorrect.'
              severity='error'
            />
          )}

        </form>

      </div>
    </div>
  )
}

export default LoginPage
