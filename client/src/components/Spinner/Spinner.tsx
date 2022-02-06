import classNames from 'classnames'

import styles from './Spinner.module.scss'

interface ISpinner {
  fillGrid?: boolean
}
const Spinner = (props: ISpinner) => (
  <svg className={classNames(styles.spinner, { [styles.fillGrid]: props.fillGrid })} />
)

export default Spinner
