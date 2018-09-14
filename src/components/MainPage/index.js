// External libraries
import React from 'react';

// Styles
import './MainPage.css';

// Components
import ButtonLink from '../ButtonLink';

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="main-container-titles">
        <h1>Game of Drones</h1>
        <p>Invite a friend to settle your petty dispute live over the web ✌🏼</p>
        <ButtonLink
          name="Get Started"
          linkTo="/game/setup"
        />
      </div>
    </div>
  );
};

export default MainPage;
