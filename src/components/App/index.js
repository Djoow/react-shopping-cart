import React from 'react';

import Navbar from '../Navbar';
import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import FloatCart from '../FloatCart';

const App = () => (
  <React.Fragment>
    <Navbar />
    <main>
      <Filter />
      <Shelf />
    </main>
    <FloatCart />
  </React.Fragment>
);

export default App;
