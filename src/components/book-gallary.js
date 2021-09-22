import { useState, useMemo, useEffect, useRef } from 'react';
import styles from './book-gallary.module.css';
import BookCard from './book-card';
import { queryBookByTitle } from '../lib/api';


function SortTag(props){
  const {
    name,
    onClick,
    isSelected
  } = props;
  const [internalIsSelected, setInternalIsSelected] = useState(isSelected);

  const handleOnClick = () => {
    setInternalIsSelected(!internalIsSelected);
    onClick(name);
  };


  return (
    <span
      className="sort-tag"
      style={{backgroundColor: isSelected && 'skyblue'}}
      onClick={(name) => handleOnClick(name)}
    >{name}</span>
  )
}


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

  const sortByOptions = ['title', 'publishedDate'];
  const [sortBy, setSortBy] = useState('');

  function parseQueryResult(result, shouldResetBooks){
    const data = result?.data;
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

  // handle user input change
  useEffect(() => {   
    const shouldResetBooks = userInput !== inputRef.current;
    if(shouldResetBooks){
      inputRef.current = userInput;
      setBooks([]);
      setPage(1);
      setQueryPage(1);
      setSortBy('');
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

  useEffect(() => {
    if(sortByOptions.includes(sortBy)){
      const newBooks = JSON.parse(JSON.stringify(books));
      newBooks.sort((b1, b2) => {
        if(sortBy === 'title'){
          return b1.title.localeCompare(b2.title);
        };
        if(sortBy === 'publishedDate'){
          return b1.first_publish_year < b2.first_publish_year ? -1 :(
            b1.first_publish_year > b2.first_publish_year ? 1 : 0
          )
        };
      })
      setBooks(newBooks);
    }
  }, [sortBy])

  const bookDisplay = useMemo(() => {
    let start = (page-1) * pageSize;
    let end = page * pageSize;
    return books.slice(start, end);
  }, [page, books])

  return (
    <div>
      {
        books.length === 0 ?
        <div>{displayInfo}</div>:
        <>
        <div>Sort by: 
          {
            sortByOptions.map(option => 
              <SortTag 
              name={option} 
              isSelected={option === sortBy} 
              onClick={setSortBy}/>)
          }
        </div>
        <div className={styles['card-container']}>
          {
            bookDisplay.map(book => <BookCard
            key={book.key}
            title={book.title}
            cover={book.cover_i}
            author={book.author_name?.toString()}
            publishedDate={book.first_publish_year}
            />)
          }
        </div>
        <div className={styles['page-selector']}>
          <div className={styles['page-button']} 
          onClick={() => {if(page !== 1) setPage(page - 1)}}>
            -
          </div>
          <div>{page + '/' + totalPages}</div>
          <div className={styles['page-button']} 
          onClick={() => {if(page !== totalPages) setPage(page + 1)}}>
            +
          </div>
        </div>
        </>
        
      }

  </div>
      
  )

}