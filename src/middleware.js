import {withAuth} from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login'
  }
})

export const config = {
  matcher: [
    '/dossiers',
    '/points-prelevement',
    '/prelevements-deau',
    '/preleveurs',
    '/validateur'
  ]
}
