import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeAuth } from "../../app/auth"
import { Cube } from "../Cube/Cube"

export const CubeRouting = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('token-access')

    if (accessToken) {
      dispatch(changeAuth())
    }
  }, [dispatch])

  return (
    <Cube />
  )
}
