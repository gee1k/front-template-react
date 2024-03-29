import { useUserStore } from '@/store/user'
import Button from '@mui/joy/Button'
import { useNavigate } from 'react-router'

export default function Login() {
  const login = useUserStore((state) => state.login)
  const navigate = useNavigate()

  const handleClick = async () => {
    await login({
      username: 'admin',
      password: '123456',
    })

    navigate('/')
  }
  return (
    <div>
      <Button onClick={handleClick}>点我</Button>
    </div>
  )
}
