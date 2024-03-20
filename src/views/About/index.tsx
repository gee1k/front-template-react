import Button from '@mui/joy/Button'
import { useNavigate } from 'react-router'

export default function About() {
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate('/')
  }
  return (
    <div>
      <Button onClick={handleClick}>点我</Button>
    </div>
  )
}
