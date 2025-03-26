import { useState } from 'react'

import withAuth from '@hooks/withAuth'
import ProgressBar from '@components/shared/ProgressBar'
import Terms from '@components/account/Terms'

// STEP 0 = 약관동의
// STEP 1 = 계좌 개설 폼 페이지
// STEP 2 = 완료페이지
const LAST_STEP = 2 // 완료페이지

function AccountNew() {
  const [step, setStep] = useState(0)

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />

      {step === 0 ? <Terms /> : null}
    </div>
  )
}

export default withAuth(AccountNew)
