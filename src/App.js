import './App.css';
import Header from './components/header';
import { useState } from 'react';
import { queryBookByTitle } from './lib/api';
import BookGallary from './components/book-gallary';

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


function App() {

  const sortByOptions = ['title', 'publishedDate'];
  const [sortBy, setSortBy] = useState('title');
  const [userInput, setUserInput] = useState('');

  const onConfirm = (userInput) => {
    setUserInput(userInput);
  };


  return (
      <div className="App">
        <Header onConfirm={onConfirm}/>
        <div className="App-content-container">
          <div className="App-content">
            <div>Sort by: 
              {
                sortByOptions.map(option => 
                  <SortTag 
                  name={option} 
                  isSelected={option === sortBy} 
                  onClick={setSortBy}/>)
              }
            </div>
            <div className="books-container">
              <BookGallary userInput={userInput}/>
            </div>
          </div>
          
        </div>
      </div>
  );
}

export default App;
