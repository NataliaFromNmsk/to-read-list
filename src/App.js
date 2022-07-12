import './App.css';
import { ReadingList } from './ReadingList';

function App() {
  return (
    <div className="App">    
      <div>
        <h1>Мой список книг для чтения</h1> 
        <ReadingList />
      </div>
      <div className="by">
        <p className='icon'>icons by <a target="_blank" rel="noreferrer" href="https://icons8.com">Icons8</a></p>
        <p ><a className="natalia" rel="noreferrer" href="https://natalia-bb.glitch.me" target="_blank">by Belova Natalia</a></p> 
      </div>      
    </div>
  );
}

export default App;
