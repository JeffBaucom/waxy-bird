import Game from './Game';
import Loader from './Loader';
import React, {useEffect, useState} from 'react';
import {
  NavLink
} from "react-router-dom"

function WaxyBird(props) {
  const [unlockedSkins, setUnlockedSkins] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchAssets = () => {
    const queryString = `https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=mixandmaxwoo&page=1&limit=100&order=desc&sort=asset_id&owner=${props.userAccount}`;
    fetch(queryString)
    .then(res => res.json())
    .then((result) => {
      console.log(result);
        let unlockedUserSkins = "1";
        const userTemplates = result.data.map((element) => element.template.template_id);
        // Pumpkin / #2
        if (userTemplates.indexOf("440231") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat('|2');
        }
        // ClassPresident / #3
        if (userTemplates.indexOf("438867") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat('|3');
        }
        // Frosti / #4
        if (userTemplates.indexOf("438869") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat("|4");
        }
        // Dill / #5
        if (userTemplates.indexOf("442880") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat("|5");
        }
        // Dire / #6
        if (userTemplates.indexOf("442882") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat("|6");
        }
        // Moony / #7
        if (userTemplates.indexOf("442886") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat("|7");
        }
        // The Goit / #8
        if (userTemplates.indexOf("442883") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat("|8");
        }
        // Unc. Ani / #9
        if (userTemplates.indexOf("442884") > -1) {
          unlockedUserSkins = unlockedUserSkins.concat("|9");
        }

        setUnlockedSkins(unlockedUserSkins);
        setIsLoaded(true);
      });
    };

    fetchAssets();
  }, [props.userAccount]); 

  function submitScore(wallet, score, avatar = 1) {
    let details = {
      WalletID: wallet,
      Score: score,
      Avatar: avatar,
    }

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('/api/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
  }

  // if (userAccount) {
  // } else {
  //   mainScreen = <h1>Please Log In</h1>
  // }

  return (
    <div className="game-container">
      <div className="subnav">
        <button className="navbar-button">
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </button>
      </div>
      {isLoaded ? 
      <Game walletID={props.userAccount} unlockedSkins={unlockedSkins} submitScore={submitScore}></Game> 
      : <Loader className="game-loading"></Loader>}
    </div>
  );
}

export default WaxyBird;
