import React, { Suspense } from 'react';
import Loader from '../Loader';

const Navbar = React.lazy(() => import(/* webpackChunkName: 'preload.navbar' */ '../Navbar'));
const Shelf = React.lazy(() => import(/* webpackChunkName: 'preload.shelf' */ '../Shelf'));
const Filter = React.lazy(() => import(/* webpackChunkName: 'prefetch.filter' */ '../Shelf/Filter'));
const FloatCart = React.lazy(() => import(/* webpackChunkName: 'prefetch.float-cart' */'../FloatCart'));

const App = () => (
  <React.Fragment>
    <Suspense fallback={<Loader/>}>
      <Navbar />
    </Suspense>
      <main>
        <Suspense fallback={<Loader/>}>
          <Filter />
        </Suspense>
        <Suspense fallback={<Loader/>}>
          <Shelf />
        </Suspense>
      </main>
    <Suspense fallback={<Loader/>}>
      <FloatCart />
    </Suspense>
  </React.Fragment>
);

export default App;
