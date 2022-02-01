import {useState} from 'react';
import {dataLululemon} from './dataLululemon';
import {dataAdidas} from './dataAdidas';
import './App.css';

function App() {
  const [file, setFile] = useState(0);
  const [list, setList] = useState([]);
  const {name, picture} = dataAdidas[file];
  const [gifts, setGifts] = useState(dataLululemon);
  const [crossed, setCrossed] = useState('false');

  const prevFile = () => {
    setFile((file => {
      file--;
      if (file < 0) {
        file = dataAdidas.length - 1;
      }
      return file;
    }))
  }

  const nextFile = () => {
    setFile((file => {
      file++;
      if (file > dataAdidas.length - 1) {
        file = 0;
      }
      return file;
    }))
  }

  const addFile = (name) => {
    const itemL = dataLululemon.find(itemL => itemL.name === name);
    const itemA = dataAdidas.find(itemA => itemA.name === name);
    if (!list.includes(itemL) || !list.includes(itemA)) {
      if (itemL) {
        if (!list.includes(itemL)) {
          setList([...list, itemL]);
        }
      }
      if (itemA) {
        if (!list.includes(itemA)) {
          setList([...list, itemA]);
        }
      }
    }
  }

  const removeItem = (id) => {
    let newGifts = gifts.filter(gift => gift.id !== id)
    setGifts(newGifts);
  }

  const crossedOut = () => {
    setCrossed(!crossed);
  }

  return(
    <div className='bigDiv'>
      <div className='description'>
        <h1>Welcome to the WishList <i class="fas fa-exclamation"></i></h1>
          <p>
            Here are some of my <i>absolute</i> favorite items from both <span><strong>adidas</strong></span> and <span><strong>lululemon</strong></span>. If you like any of them, click <span><strong>WishList</strong></span> button and it will be added to your list here:
          </p>
          <ul>
            {list.map((newElement => {
              const {name} = newElement;
              return(
                <li className={crossed ? null : 'done'} onClick={crossedOut} key={newElement.id}><span><i class="fas fa-check"></i></span> {name}</li>
              )
            }))}
          </ul>
      </div>
      <div className='adiDiv'>
        <div className='container'>
          <h1><span>adidas</span> dresses</h1>
        </div>
        <div className='list'>
          <div className='item'>
            <div className='container'>
              <img src={picture} height='200px' alt={name} />
            </div>
            <div className='container'>
              <h2>{name}</h2>
            </div>
            <div className='container'>
              <button onClick={() => prevFile()}>Prev</button>
              <button className='wishlist' onClick={() => addFile(name)}>WishList</button>
              <button onClick={() => nextFile()}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <div className='luluDiv'>
        <div className='header'>
          <h1>{gifts.length} <span>lululemon</span> pieces</h1>
        </div>
        <div className='list'>
            {gifts.map((element => {
              const {id, name, picture, link} = element;
              return(
                <div className='item' key={id}>
                  <div className='container'>
                    <h3>{id} - {name}</h3>
                  </div>
                  <div className='container'>
                    <img src={picture} height='200px' alt={name} />
                  </div>
                  <div className='container'>
                    <a href={link} target='_blank' rel="noreferrer">find out more</a>
                  </div>
                  <div className='container'>
                    <button className='wishlist' onClick={() => addFile(name)}>WishList</button>
                    <button className='remove-each' onClick={() => removeItem(id)}>Remove</button>
                  </div>
                </div>
              )
            }))}
        </div>
        <div className='container'>
          <button className='btn' onClick={() => setGifts([])}>Clear All</button>
          <button className='btn' onClick={() => setGifts(dataLululemon)}>Restore All</button>
        </div>
      </div>
    </div>
  )
}

export default App;