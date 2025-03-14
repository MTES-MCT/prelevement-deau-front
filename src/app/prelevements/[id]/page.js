import {redirect} from 'next/navigation'

export default function Page({params}) {
  redirect(`/prelevements/${params.id}/identification`)
}
