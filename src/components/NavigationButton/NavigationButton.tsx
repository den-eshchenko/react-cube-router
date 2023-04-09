import { Button, Tooltip } from "antd"
import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams"
import styles from './NavigationButton.module.css'

type TNavigationButton = {
  icon?: React.ReactNode
  title: string
  path: string
  tooltipTitle: string
}

export const NavigationButton: React.FC<TNavigationButton> = ({ icon, title, path, tooltipTitle }) => {
  const { navigateWithSearchParams } = useNavigateWithSearchParams()
  
  const handleChangeSide = (path: string) => () => {
    navigateWithSearchParams({ nextSide: path })
  }
  
  return (
    <Tooltip title={tooltipTitle} placement="right" color="blue" className={styles.navigationItem}>
      <Button onClick={handleChangeSide(`/${path}`)}>
          {icon || title}
      </Button>
    </Tooltip>
  )
}