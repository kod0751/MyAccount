import { collection, doc, setDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'

export function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}
