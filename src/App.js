import './App.css';
import Header from './components/header';
import { useState } from 'react';
import BookGallary from './components/book-gallary';

function App() {

  const [userInput, setUserInput] = useState('');

  const onConfirm = (userInput) => {
    setUserInput(userInput);
  };


  return (
      <div className="App">
        <Header onConfirm={onConfirm}/>
        <div className="App-content-container">
          <div className="App-content">
            <div className="books-container">
              <BookGallary userInput={userInput}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
