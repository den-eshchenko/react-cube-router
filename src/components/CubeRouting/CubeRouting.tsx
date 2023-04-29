import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeAuth, changeLogin } from "../../app/auth"
import { Cube } from "../Cube/Cube"

export const CubeRouting = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    const accessToken = localStorage.getItem('token-access')
      const user = localStorage.getItem('user')

      if (accessToken) {
        dispatch(changeLogin(user))
        dispatch(changeAuth())
      }
  }, [dispatch])

  return (
    <Cube />
  )
}
