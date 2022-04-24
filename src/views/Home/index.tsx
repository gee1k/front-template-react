import { DatePicker } from 'antd'
import { PageContainer } from '@/components/PageContainer'

export default function Home() {
  return (
    <PageContainer showHeader={false}>
      <div>
        <DatePicker />
      </div>
    </PageContainer>
  )
}
