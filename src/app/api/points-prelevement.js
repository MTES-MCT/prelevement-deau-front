'use server'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const {API_TOKEN} = process.env

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Token ${API_TOKEN}`
}

export async function getPointsPrelevement() {
  const response = await fetch(`${API_URL}/api/points-prelevement`, {headers})
  return response.json()
}

export async function getPointPrelevement(id) {
  const response = await fetch(`${API_URL}/api/points-prelevement/${id}`, {headers})
  return response.json()
}

export async function getBeneficiaire(id) {
  try {
    const response = await fetch(`${API_URL}/api/beneficiaires/${id}`, {headers})
    return response.json()
  } catch {
    return null
  }
}

export async function getBeneficiaires() {
  try {
    const response = await fetch(`${API_URL}/api/beneficiaires`, {headers})
    return response.json()
  } catch {
    return null
  }
}

export async function getPointsFromBeneficiaire(idBeneficiaire) {
  try {
    const response = await fetch(`${API_URL}/api/beneficiaires/${idBeneficiaire}/points-prelevement`, {headers})
    return response.json()
  } catch {
    return null
  }
}

export async function getExploitationsByPointId(pointId) {
  const response = await fetch(`${API_URL}/api/points-prelevement/${pointId}/exploitations`, {headers})
  const exploitations = await response.json()
  return exploitations
}

export async function getStats() {
  const response = await fetch(`${API_URL}/api/stats`)
  const stats = await response.json()

  return stats
}

export async function getVolumesExploitation(exploitationId) {
  const response = await fetch(`${API_URL}/api/exploitations/${exploitationId}/volumes-preleves`, {headers})
  const volumes = await response.json()
  return volumes
}
