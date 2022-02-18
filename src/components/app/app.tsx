import React, { FC } from 'react';

import DndBoard from '../dndboard/dndboard.component';
import styles from './app.module.scss';

const App: FC = () => {
  return (
    <div className={styles.appWrapper}>
      <header className={styles.appHeader}>
        <h1>Drag And Drop</h1>
      </header>
      <DndBoard />
    </div>
  );
};

export default App;
