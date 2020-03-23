import React from 'react';
import { cn } from '@bem-react/classname';

import TopForm from '../TopForm/TopForm';
import Canvas from '../Canvas/Canvas';

import './App.scss';

const block = cn('App');

function App() {
  return (
    <div className={block()}>
      <TopForm />
      <Canvas />
    </div>
  );
}

export default App;
