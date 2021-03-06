import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Games from './components/Games';
import Game from './components/Game';
import EncounterList from './components/EncounterList';
import Encounter from './components/Encounter';
import PersistentCharacterList from './components/PersistentCharacterList';
import PersistentCharacter from './components/PersistentCharacter';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/persistent_characters">Characters</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link to="/encounters">Encounters</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/encounters" component={EncounterList} />
        <Route
          exact
          path="/persistent_characters"
          component={PersistentCharacterList}
        />
        <Route path="/games/:game_id/encounters/:id" component={Encounter} />
        <Route path="/games/:id" component={Game} />
        <Route path="/encounters/:id" component={Encounter} />
        <Route
          path="/persistent_characters/:id"
          component={PersistentCharacter}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
