import { Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { languageState } from '@/store/app'
import './index.less'

export default function LangSelect() {
  const [language, setLanguage] = useRecoilState(languageState)

  const onClick = ({ key }: { key: string }) => {
    setLanguage(key)
  }
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        { key: 'zh', label: '中文', disabled: language === 'zh' },
        { key: 'en', label: 'English', disabled: language === 'en' },
      ]}
    ></Menu>
  )

  return (
    <Dropdown overlay={menu}>
      <TranslationOutlined className="lang-select-btn" />
    </Dropdown>
  )
}
