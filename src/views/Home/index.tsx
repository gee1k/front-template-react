import Button from '@mui/joy/Button'
import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()

  const handleClick = async () => {
    navigate('/dashboard')
  }
  return (
    <div>
      <Button onClick={handleClick}>点我</Button>
    </div>
  )
}
