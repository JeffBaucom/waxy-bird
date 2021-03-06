import React from 'react'
import Unity, {UnityContent, UnityContext } from 'react-unity-webgl'

const Game = (props) => {
    const unityContent = new UnityContent(
        '../../../build/Builds.json',
        '../../../build/UnityLoader.js'
      )

    window.GiveWalletID = function() {
      console.log(props);
      unityContent.send("GameManager", "SetupWalletString", props.walletID);
    }

    window.GiveUnlockedSkins = function() {
      console.log(props);
      unityContent.send("GameManager", "SetupSkins", props.unlockedSkins);
    }


    window.SubmitScore = function(walletId, score, avatar = 1) {
      props.submitScore(walletId, score, avatar);
    }
    
      return (
        <div>
          <Unity unityContent={unityContent} width="100%" height="100%" />
        </div>
      )
}

export default Game;