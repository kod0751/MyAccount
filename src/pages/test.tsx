import CardListAddButton from '@components/test/CardListAddButton'
import EventBannerAddButton from '@components/test/EventBannerAddButton'
import EventForm from '@components/test/EventForm'
import FAQAddButton from '@components/test/FAQAddButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import TransactionForm from '@components/test/TransactionForm'

export default function test() {
  return (
    <Flex direction="column">
      <Text bold={true}>배너</Text>
      <EventBannerAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>카드</Text>
      <CardListAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <EventForm />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>입출금 테스트</Text>
      <TransactionForm />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>FAQ 테스트</Text>
      <FAQAddButton />
    </Flex>
  )
}
