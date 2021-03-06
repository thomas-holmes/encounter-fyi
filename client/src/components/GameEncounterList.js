import React from 'react';
import { Link } from 'react-router-dom';

import GameEncounterForm from './GameEncounterForm';

import axios from 'axios';

class GameEncounterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.encounters = props.encounters || [];
    this.state.gameId = props.gameId;

    this.createGameEncounter = this.createGameEncounter.bind(this);
    this.deleteGameEncounter = this.deleteGameEncounter.bind(this);
  }

  refreshGameEncounters() {
    axios
      .get(`/api/v1/games/${this.state.gameId}/encounters.json`)
      .then(response => {
        console.log(response);
        this.setState({
          encounters: response.data
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.refreshGameEncounters();
  }

  createGameEncounter(name) {
    console.log(name);
    axios
      .post(`/api/v1/games/${this.state.gameId}/encounters`, {
        game_id: this.state.gameId,
        name: name
      })
      .then(response => {
        console.log(response);

        const encounter = response.data;
        this.setState({
          encounters: [...this.state.encounters, encounter]
        });
      })
      .catch(error => console.log(error));
  }

  deleteGameEncounter(gameId, id) {
    axios
      .delete(`/api/v1/games/${gameId}/encounters/${id}`)
      .then(response => {
        console.log(response);
        this.refreshGameEncounters();
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h2>Game Encounters</h2>
        <ul>
          {this.state.encounters.map(encounter =>
            encounterLi(this.state.gameId, encounter, this.deleteGameEncounter)
          )}
        </ul>

        <GameEncounterForm createHandler={this.createGameEncounter} />
      </div>
    );
  }
}

function encounterLi(gameId, encounter, deleteEncounterHandler) {
  return (
    <li key={encounter.id}>
      <Link to={{ pathname: `/games/${gameId}/encounters/${encounter.id}` }}>
        {encounter.name}
      </Link>

      <button onClick={() => deleteEncounterHandler(gameId, encounter.id)}>
        Delete
      </button>
    </li>
  );
}

export default GameEncounterList;
