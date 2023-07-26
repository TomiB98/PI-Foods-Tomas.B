import React, {useState} from 'react';
import styles from './pagination.module.css';

export const Pagination = ({page, setPage, maximo }) => {
  const [input, setInput] = useState (1);

  const nextPage = () => {
    setInput (parseInt(input) + 1);
    setPage (parseInt(page) + 1);
  };

  const previousPage = () => {
    setInput (parseInt(input) - 1);
    setPage (parseInt(page) - 1);
  };


  return (
    <div className={styles.container}>
      <button className={styles.buttonPag} disabled={page === 1 || page < 1} onClick={previousPage}>Prev</button>

      <h3 className={styles.inputPag}>-{page}-</h3>

      <button className={styles.buttonPag} disabled={page === Math.ceil (maximo) || page > Math.ceil (maximo)} onClick={nextPage} >Next</button>
      
    </div>
  );
};