import styles from './book-card.module.css';

export default function BookCard(props){
  const {
    title,
    cover,
    author,
    publishedDate
  } = props;


  return (
    <div className={styles['book-card-container']}>
      <img className={styles['book-cover']} src={'http://covers.openlibrary.org/b/id/' + cover + '-M.jpg'}
      alt="No Cover Available"/> 
      <div className={styles['book-title']}>{title + ' ' +
      `${publishedDate ? '(' + publishedDate + ')' : ''}`}</div>
      <div className={styles['book-author']}>{author}</div>
    </div>
  )
}