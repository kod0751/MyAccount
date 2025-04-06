import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { useMemo } from 'react'

import { getTerms } from '@remote/account'
import { User } from '@models/user'
import useUser from '@/hooks/useUser'
import { TERMSLIST } from '@constants/account'
import Top from '@shared/Top'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'

export default function TermsPage() {
  const user = useUser()

  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )

  const AgreeTermList = useMemo(() => {
    if (data == null) {
      return null
    }

    const AllAgreeTermList = TERMSLIST.filter(({ id }) =>
      data.termIds.includes(id),
    )

    const MandatoryTermList = AllAgreeTermList.filter(
      ({ mandatory }) => mandatory === true,
    )
    const ChoiceTermList = AllAgreeTermList.filter(
      ({ mandatory }) => mandatory === false,
    )

    return { MandatoryTermList, ChoiceTermList }
  }, [data])

  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />

      {AgreeTermList == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {AgreeTermList.MandatoryTermList.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}
          {AgreeTermList.ChoiceTermList.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={<Button>철회</Button>}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
