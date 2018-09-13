// External libraries
import React, { PureComponent } from 'react';

// Styles
import './SetupGame.css';

// Api
import { roomServices } from '../../api';

// Config
import config from '../../config';

// Components
import InputField from '../InputField';
import Button from '../Button';

class SetupGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameUrl: '',
    };
  };
  // Life cycle methods
  componentDidMount() {
    // TODO create room;
    roomServices.create()
      .then((data) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            gameUrl: `${config.API_URL}/room/${data.room.id}?player=player2`,
          };
        });
      })
      .catch((err) => {
        // TODO show modal on error
      });
  }
  render() {
    const { gameUrl }= this.state;

    return (
      <div className="container-game-setup">
        <div className="container-form">
          <form className="form-game-setup">
            <InputField
              type="text"
              required={true}
              name="Username"
            />
            <span className="game-url">{gameUrl}</span>
            <p className="text-game-setup"> Send this link to your opponent to connect. </p>
            <div className="form-buttons">
              <Button
                name="Start"
                linkTo="/game/roomId"
              />
              <Button
                name="Cancel"
                linkTo="/"
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
};

export default SetupGame;
