import { Button, Col, Row } from "antd"
import styles from './DefaultContentComponent.module.css'

type TDefaultRow = {
  label?: string
}

const DefaultRow: React.FC<TDefaultRow> = ({ label = '' }) => {
  return (
    <Row className={styles.defaultRow} gutter={[20, 20]}>
      <Col className={styles.defaultCol}>
        <Button className={styles.defaultButtonSize}>{label}</Button>
      </Col>
      <Col className={styles.defaultCol}>
        <Button className={styles.defaultButtonSize}>{label}</Button>
      </Col>
      <Col className={styles.defaultCol}>
        <Button className={styles.defaultButtonSize}>{label}</Button>
      </Col>
      <Col className={styles.defaultCol}>
        <Button className={styles.defaultButtonSize}>{label}</Button>
      </Col>
    </Row>
  )
}

type TDefaultContentComponent = {
  label?: string
}

export const DefaultContentComponent: React.FC<TDefaultContentComponent> = ({ label = '' }) => {
  return (
    <Row gutter={[20, 20]} className={styles.defaultContainer}>
      <DefaultRow label={label} />
      <DefaultRow label={label} />
      <DefaultRow label={label} />
      <DefaultRow label={label} />
      {/* <DefaultRow label={label} /> */}
    </Row>
  )
}