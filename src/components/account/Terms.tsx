import { useState } from 'react'

import { TERMSLIST } from '@constants/account'
import { Term } from '@models/account'
import Agreement from '@shared/Agreement'
import FixedBottomButton from '../shared/FixedBottomButton'

export default function Terms() {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateIntitalValues(TERMSLIST),
  )
  console.log('termsAgreements', termsAgreements)

  const handleAllAgreement = () => {}

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={false} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={() => {}}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton label="약관동의" disabled={false} onClick={() => {}} />
    </div>
  )
}

function generateIntitalValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}
