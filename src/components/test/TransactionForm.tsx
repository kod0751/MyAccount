import { ChangeEvent, useState } from 'react'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Spacing from '@shared/Spacing'
import Select from '@shared/Select'
import Button from '@shared/Button'

export default function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  console.log('formValues', formValues)

  return (
    <div>
      <Flex direction="column">
        <TextField
          label="유저아이디"
          name="userId"
          value={formValues.userId}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Select
          name="type"
          value={formValues.type}
          options={[
            {
              label: '입금',
              value: 'deposit',
            },
            {
              label: '출금',
              value: 'withdraw',
            },
          ]}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextField
          label="입출금 금액"
          name="amount"
          value={formValues.amount}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextField
          label="화면에 노출할 텍스트"
          name="displayText"
          value={formValues.displayText}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Button>{formValues.type === 'deposit' ? '입금' : '출금'}</Button>
      </Flex>
    </div>
  )
}
