import { useState, useMemo, useEffect, useRef } from 'react';
import styles from './book-gallary.module.css';
import BookCard from './book-card';
import { queryBookByTitle } from '../lib/api';

export default function BookGallary(props) {
  const {
    userInput
  } = props;

  const pageSize = 20;
  const inputRef = useRef(userInput);

  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [booksSize, setBooksSize] = useState(0);

  const totalPages = Math.ceil(booksSize /pageSize);

  const [displayInfo, setDisplayInfo] = useState("Please enter search text first.");

  const [queryPage, setQueryPage] = useState(1);

  function parseQueryResult(result, shouldResetBooks){
    const data = result?.data;
    console.log(data);
    if(data){
      setBooksSize(data.numFound);
      if(data.numFound === 0){
        setBooks([]);
        setDisplayInfo("No books found.")
      } else {
        setBooks(shouldResetBooks ? data.docs : [...books, ...data.docs]);
      }
    } else {
      setDisplayInfo("No books found.");
    }
  }

  useEffect(() => {   
    // console
    const shouldResetBooks = userInput !== inputRef.current;
    if(shouldResetBooks){
      inputRef.current = userInput;
      setBooks([]);
      setPage(1);
      setQueryPage(1);
    }
    const result = queryBookByTitle(userInput, queryPage);
    result.then(
      response => parseQueryResult(response, shouldResetBooks),
      error => console.log(error)
    )
  }, [userInput, queryPage])

  useEffect(() => {
    if(page * 20 > books.length && page !== 1 && queryPage * 100 < booksSize){
      setQueryPage(queryPage + 1)
    }
  }, [page])

  // const setPagesWrapper = () => {

  // }

  const bookDisplay = useMemo(() => {
    let start = (page-1) * pageSize;
    let end = page * pageSize;
    return books.slice(start, end);
  }, [page, books])



  
  return (
    <div>
      <div className={styles['card-container']}>
        {
          bookDisplay.map(book => <BookCard
           title={book.title}
           cover={book.cover_i}
           author={book.author}
           publishedDate={book.first_publish_year}
          />)
        }
      </div>
      <div>
        <div onClick={() => {if(page !== 1) setPage(page - 1)}}> - </div>
        <div>{page + '/' + totalPages}</div>
	      <div onClick={() => {if(page !== totalPages) setPage(page + 1)}}> + </div>
      </div>
    </div>
  )

}