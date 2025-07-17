import {Button} from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

import {
  getBnpe,
  getBvBdcarthage,
  getMeContinentales,
  getMeso,
  getPointPrelevement
} from '@/app/api/points-prelevement.js'
import PointEditionForm from '@/components/form/point-edition-form.js'
import {StartDsfrOnHydration} from '@/dsfr-bootstrap/index.js'

const Page = async ({params}) => {
  const {id} = await params
  const pointPrelevement = await getPointPrelevement(id)
  if (!pointPrelevement) {
    notFound()
  }

  const bnpeList = await getBnpe()
  const mesoList = await getMeso()
  const meContinentalesBvList = await getMeContinentales()
  const bvBdCarthageList = await getBvBdcarthage()

  return (
    <>
      <StartDsfrOnHydration />

      <div className='flex justify-end'>
        <Button
          priority='secondary'
          iconId='fr-icon-close-line'
          linkProps={{
            href: `/prelevements/${id}`
          }}
        >
          Annuler
        </Button>
      </div>

      <PointEditionForm
        pointPrelevement={pointPrelevement}
        bnpeList={bnpeList}
        bvBdCarthageList={bvBdCarthageList}
        mesoList={mesoList}
        meContinentalesBvList={meContinentalesBvList}
      />
    </>
  )
}

export default Page
