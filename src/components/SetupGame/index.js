// External libraries
import React, { PureComponent } from 'react';

// Styles
import './SetupGame.css';

// Api
import { roomServices, userServices } from '../../api';

// Config
import config from '../../config';

// Components
import InputField from '../InputField';
import ButtonLink from '../ButtonLink';
import Button from '../Button';

class SetupGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      gameUrl: '',
      roomId: '',
    };
  };
  // Life cycle methods
  componentDidMount() {
    roomServices.create()
      .then((data) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            gameUrl: `${config.API_URL}/game/${data.room.id}/player2`,
            roomId: data.room.id,
          };
        });
      })
      .catch((err) => {
        // TODO show modal on error
      });
  }

  // Methods
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, roomId } = this.state;

    userServices.create(username)
      .then((data) => {
        this.props.history.push(`/game/${roomId}/player/${data.user.id}?player=player1`);
      })
      .catch((err) => {
        // TODO show modal on error
      })
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { gameUrl, username }= this.state;

    return (
      <div className="container-game-setup">
        <div className="container-form">
          <form className="form-game-setup" onSubmit={this.handleSubmit}>
            <InputField
              type="text"
              required={true}
              name="username"
              handleChange={this.handleChange}
              value={username}
            />
            <span className="game-url">{gameUrl}</span>
            <p className="text-game-setup"> Send this link to your opponent to connect. </p>
            <div className="form-buttons">
              <Button
                name="Start"
                type="submit"
              />
              <ButtonLink
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
