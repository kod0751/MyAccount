import { MouseEvent, useState } from 'react'

import { TERMSLIST } from '@constants/account'
import { Term } from '@models/account'
import Agreement from '@shared/Agreement'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

export default function Terms({
  onNext,
}: {
  onNext: (termIds: string[]) => void
}) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateIntitalValues(TERMSLIST),
  )
  console.log('termsAgreements', termsAgreements)

  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) =>
        term.id === id ? { ...term, checked } : term,
      )
    })
  }

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) => ({ ...term, checked }))
    })
  }

  const allCheckedTerms = termsAgreements.every((term) => term.checked)
  const essCheckedTerms = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={allCheckedTerms}
          onChange={handleAllAgreement}
        >
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={essCheckedTerms === false}
        onClick={() => {
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }}
      />
    </div>
  )
}

function generateIntitalValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}
