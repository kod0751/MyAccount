import { GetServerSidePropsContext } from 'next'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { Card } from '@/models/card'
import { getCard } from '@/remote/card'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import SEO from '@/components/shared/SEO'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCard: Card
}

export default function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams()

  const { data } = useQuery(['card', id], () => getCard(id as string), {
    initialData: initialCard,
  })

  if (data == null) {
    return
  }

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <SEO
        title={`${corpName} ${name}`}
        description={subTitle}
        image="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTExMDhfMTI5%2FMDAxNjM2MzE3Mzg5MDUy.rgja2pEJRY12fP3vqOMUEgMN_qV1epW5jfuICyxDL78g.ifa-eriuDa_7dSAafy_r-DNPMPSCb4HYpHqoUBYuo5gg.PNG.hanul8158%2Fpublicdomainq-0001313kvxjif.png&type=a340"
      />
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  width={40}
                  height={40}
                  alt=""
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="1분만에 신청하고 혜택받기" onClick={() => {}} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: { initialCard: card },
  }
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}
