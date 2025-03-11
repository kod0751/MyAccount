import Image from 'next/image'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

export default function Account() {
  const hasAccount = false

  // 계좌를 보유중일때
  if (hasAccount) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold={true}>
              7000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  // 계좌를 보유하고 있지 않을 때
  // 계좌를 개설중일수도 있다. 하지만 개설이 완료되지는 않았다.

  const accountStatus = 'READY'
  const title =
    accountStatus === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요'
      : '계좌 계설이\n더 쉽고 빨라졌어요'
  const buttonLabel =
    accountStatus === 'READY' ? '이어만들기' : '3분만에 개설하기'

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
          width={80}
          height={80}
          alt=""
        />
      </Flex>
    </div>
  )
}
