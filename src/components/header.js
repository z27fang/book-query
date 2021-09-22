import styles from './header.module.css';
import QueryInput from './queryinput.js'
/**
 * The header displays on top of the page
 */
export default function Header(props) {
  const {
    onConfirm
  } = props;
  return (
    <div className={styles['header-container']}>
      <div className={styles['header-body']}> 
        <p className={styles['header-text']}>Awesome Book Query</p>
        <div className={styles['input-container']}>  
          <QueryInput onConfirm={onConfirm}/>
        </div>
      </div>
    </div>
  )
}