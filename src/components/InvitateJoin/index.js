// External libraries
import React, { PureComponent } from 'react';

// Styles
import './InvitateJoin.css';

// Api
import { userServices } from '../../api';

// Components
import InputField from '../InputField';
import ButtonLink from '../ButtonLink';
import Button from '../Button';

class SetupGame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      roomId: '',
    };
  };
  // Life cycle methods
  componentDidMount() {
    const { match } = this.props;
    this.setState((prevState) => {
      return {
        ...prevState,
        roomId: match.params.roomId,
      }
    });
  }

  // Methods
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, roomId } = this.state;

    userServices.create(username)
      .then((data) => {
        this.props.history.push(`/game/${roomId}/player/${data.user.id}?player=player2`);
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
    const { username }= this.state;

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
