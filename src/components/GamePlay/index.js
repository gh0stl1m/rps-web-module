// External libraries
import React, { PureComponent } from 'react';
import socketIOClient from 'socket.io-client'

// Styles
import './GamePlay.css';

// Config
import config from '../../config';

// API
import { userServices, roomServices } from '../../api';

// Components
import Stars from './Stars';
import Option from './Option';
import ButtonLink from '../ButtonLink';

class GamePlay extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      roomId: '',
      player: '',
      socket: {},
      message: '',
      player1: {
        wins: 0,
        userId: '',
        active: false,
        username: '',
        choice: '',
        star1: false,
        star2: false,
        star3: false,
        rock: false,
        scissors: false,
        paper: false,
      },
      player2: {
        wins: 0,
        userId: '',
        active: false,
        username: '',
        choice: '',
        star1: false,
        star2: false,
        star3: false,
        rock: false,
        scissors: false,
        paper: false,
      }
    }
  }
  // Life cycle methods
  componentDidMount() {
    const { match, location } = this.props;

    const playerName = location.search.split('=')[1];
    this.setState((prevState) => {
      return {
        ...prevState,
        roomId: match.params.roomId,
        player: playerName,
        [playerName]: {
          ...prevState[playerName],
          userId: match.params.playerId,
          active: true,
        }
      }
    });
    // Fetch user information
    // Read user
    userServices.readById(match.params.playerId, 'username')
      .then((data) => {
        this.setState((prevState) => {
          if (playerName === 'player1') {
            return {
              ...prevState,
              player1: {
                ...prevState.player1,
                username: data.user.username,
                userId: data.user.id,
                active: true,
              }
            }
          }
          // Is player 2
          return {
            ...prevState,
            player2: {
              ...prevState.player2,
              username: data.user.username,
              userId: data.user.id,
              active: true,
            }
          }
        });
      })
      .catch((err) => {
        // TODO validate error
      })
    // Make socket connection
    const socket = socketIOClient(`${config.SOCKET_URL}?room=${match.params.roomId}&player=${match.params.playerId}`);
    this.setState((prevState) => {
      return {
        ...prevState,
        socket,
      }
    });
    // Join to room
    socket.emit('JOIN_ROOM', playerName);
    // Listen events
    socket.on('PLAYER_JOINED', (data) => {
      userServices.readById(data.user, 'username')
        .then((data) => {
          if (data.user.id !== this.state.player1.userId) {
            this.setState((prevState) => {
              return {
                ...prevState,
                player2: {
                  ...prevState.player2,
                  username: data.user.username,
                  userId: data.user.id,
                  active: true,
                }
              }
            });
          } else {
            this.setState((prevState) => {
              return {
                ...prevState,
                player1: {
                  ...prevState.player1,
                  username: data.user.username,
                  userId: data.user.id,
                  active: true,
                }
              }
            });
          }
        })
        .catch((err) => {
          // TODO validate error
        })
    });
    socket.on('ROUND_TIE', () => {
      console.log('ROUND TIE');
      this.setState((prevState) => {
        return {
          ...prevState,
          player1: {
            ...prevState.player1,
            rock: false,
            scissors: false,
            paper: false,
            choice: '',
          },
          player2: {
            ...prevState.player2,
            rock: false,
            scissors: false,
            paper: false,
            choice: '',
          },
          message: 'Round Tie',
        }
      });
    });
    socket.on('ROUND_WINNER', (data) => {
      console.log('ROUND WINNER: ', data);
        this.setState((prevState) => {
          return {
            ...prevState,
            player1: {
              ...prevState.player1,
              rock: false,
              scissors: false,
              paper: false,
              choice: '',
            },
            player2: {
              ...prevState.player2,
              rock: false,
              scissors: false,
              paper: false,
              choice: '',
            },
          }
        });
    });
    socket.on('GAME_WINNER', (data) => {
      console.log('GAME WINNER: ', data);
      this.setState((prevState) => {
        let messageGame = ''
        if (data.winner === prevState.player1.userId) {
          messageGame = `The user ${prevState.player1.username} wins the game`;
        } else {
          messageGame = `The user ${prevState.player2.username} wins the game`;
        }
        return {
          ...prevState,
          player1: {
            ...prevState.player1,
            wins: 0,
            rock: false,
            scissors: false,
            paper: false,
            choice: '',
          },
          player2: {
            ...prevState.player2,
            wins: 0,
            rock: false,
            scissors: false,
            paper: false,
            choice: '',
          },
          message: messageGame,
        }
      });
      // TODO change state
    });
    // Load room data
    roomServices.readById(match.params.roomId, 'player1,player2')
      .then((data) => {
        // Read player 1
        if (data.room && data.room.player1.user) {
          userServices.readById(data.room.player1.user, 'username')
            .then((data) => {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  player1: {
                    ...prevState.player1,
                    username: data.user.username,
                    active: true,
                  }
                }
              });
            })
            .catch((err) => {
              // TODO validate error
            });
        }
        // Read player 2
        if (data.room && data.room.player2.user) {
          userServices.readById(data.room.player2.user, 'username')
            .then((data) => {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  player2: {
                    ...prevState.player2,
                    username: data.user.username,
                    active: true,
                  }
                }
              });
            })
            .catch((err) => {
              // TODO validate error
            });
        }
      })
      .catch((err) => {
        // TODO validate error
      })
  }

  // Methods
  choiceOption = (player, option) => {
    const { player1, player2, socket } = this.state;
  
    if ((player === 'player1') && (player1.rock || player1.paper || player1.scissors)) return;
    if ((player === 'player2') && (player2.rock || player2.paper || player2.scissors)) return;
    this.setState((prevState) => {
      return {
        ...prevState,
        [player]: {
          ...prevState[player],
          [option]: true,
          choice: option,
        }
      }
    });
    // Emit event
    socket.emit('PLAYER_CHOICE', option.toUpperCase());
  }
  render() {
    const { player1, player2, message } = this.state;

    return (
      <div className="container-game">
        <h2 className="game-message">{message}</h2>
        <div className="container-choice-game">
          <Stars username={player1.username}/>      
          <div className="container-options">
            <Option
              image="rock"
              onClick={() => this.choiceOption('player1', 'rock')}
              styleClass={ (player1.rock) ? 'change-background' : '' }
            />
            <Option
              image="paper"
              onClick={() => this.choiceOption('player1', 'paper')}
              styleClass={ (player1.paper) ? 'change-background' : '' }
            />
            <Option
              image="scissors"
              onClick={() => this.choiceOption('player1', 'scissors')}
              styleClass={ (player1.scissors) ? 'change-background' : '' }
            />
          </div>
        </div>
        {
          (player2.active) ? (
            <div className="container-choice-game">        
              <Stars username={player2.username}/>    
              <div className="container-options">
              <Option
                  image="rock"
                  onClick={() => this.choiceOption('player2', 'rock')}
                  styleClass={ (player2.rock) ? 'change-background' : '' }
                />
                <Option
                  image="paper"
                  onClick={() => this.choiceOption('player2', 'paper')}
                  styleClass={ (player2.paper) ? 'change-background' : '' }
                />
                <Option
                  image="scissors"
                  onClick={() => this.choiceOption('player2', 'scissors')}
                  styleClass={ (player2.scissors) ? 'change-background' : '' }
                />
              </div>
            </div>

          ) : (<h2 className="text-player-waiting"> Waiting for player...</h2>) 
        }
        <div className="container-game-button">
          <ButtonLink
            linkTo="/"
            name="Leave Game"
          />
        </div>
      </div>
    );
  };
};

export default GamePlay;
