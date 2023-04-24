import { Button } from "antd"
import { changeAuth } from "../../app/auth"
import { useAppDispatch } from "../../app/store"
import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams"

export const Logout = () => {
  const dispatch = useAppDispatch()
  const { navigateWithSearchParams } = useNavigateWithSearchParams()

  const handleLogout = () => {
    navigateWithSearchParams({ nextSide: '/front_side' })
    localStorage.removeItem('token-access');
    localStorage.removeItem('token-refresh');
    dispatch(changeAuth())
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}