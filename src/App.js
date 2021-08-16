import React, { useState, useEffect } from 'react'
import Form from './components/Form';
import ListImages from './components/ListImages';

function App() {
  const [input, saveInput] = useState('');
  const [images, saveImages] = useState([]);
  const [actualPage, saveActualPage] = useState(1);
  const [totalPages, saveTotalPages] = useState(2);

  console.log(images);

  useEffect(() => {
    if(input === '') return;

    const consultAPI = async () => {
      const key = "22226679-db1ba202cab9a573432a95ea3";
      const imagesPerPage = 28;
      const url = `https://pixabay.com/api/?key=${key}&q=${input}&per_page=${imagesPerPage}&page=${actualPage}`;

      const response = await fetch(url);
      const listImages = await response.json();
      saveImages(listImages.hits);

      //Calculate total pages
      const cantPages = Math.ceil(listImages.totalHits / imagesPerPage);
      saveTotalPages(cantPages);

      //Move screen to top
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }

    consultAPI();
  }, [input, actualPage]);

  const previousPage = () => {
    const newActualPage = actualPage - 1;
    if(newActualPage === 0) return;
    saveActualPage(newActualPage);
  }

  const nextPage = () => {
    const newActualPage = actualPage + 1;
    if(newActualPage > totalPages) return;
    saveActualPage(newActualPage);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Search</p>
        <Form 
          saveInput={saveInput}
        />
      </div>

      <div className="row justify-content-center">
        <ListImages 
          images={images}
        />

        {actualPage === 1 ? null : (
          <button
          type="button"
          className="btn btn-info mr-4"
          onClick={previousPage}
          >&laquo; Previous</button>
        )}
        
        {actualPage === totalPages || images.length === 0 ? null : (
          <button
          type="button"
          className="btn btn-info"
          onClick={nextPage}
          >Next &raquo;</button>
        )}
        
      </div>
    </div>
  );
}

export default App;
