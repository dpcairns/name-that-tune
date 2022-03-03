import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { insertLeaderBoard } from './services/fetch-utils';
import './GamePage.css';

export default function GamePage({ token, userProfile }) {
  const [tracks, setTracks] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [tracksShuffled, setTracksShufffled] = useState([]);
  const [counter, setCounter] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(30);
  const [timer, setTimer] = useState('');
  const [availablePoints, setAvailablePoints] = useState(100);
  const [pointsTimer, setPointsTimer] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  const netlifyUrl = '/.netlify/functions/spotify-playlist-items';

  const params = useParams();
  const history = useHistory();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //STRETCH FEATURE
  // CREATE AN ARRAY OF 4 CHOICE
  // 1 is the correct answer
  // 3 are random incorrect answers
  // So we could push the correct answer into an array
  // Then randomly push 3 more that DO NOT MATCH THE FIRST/CORRECT ANSWER
  //THEN RANDOMIZE THE WHOLE ARRAY


  useEffect(() => {
    if (tracks) {
      let trackShuffled = [...tracks];
      shuffleArray(trackShuffled);
      setTracksShufffled(trackShuffled);
    }
  }, [tracks]);

  useEffect(() => {
    async function fetchPlayListsFromSpotify() {
      const response = await fetch(`${netlifyUrl}?token=${token}&playlist_id=${params.id}`);
      const json = await response.json();
      setTracks(json.data.items);
    }
    fetchPlayListsFromSpotify();
  }, [token, params.id]);

  useEffect(() => {
    !isGameStarted && clearInterval(timer);
    !isGameStarted && clearInterval(pointsTimer);
  }, [isGameStarted]);
  

  
  function handleStartGame() {
    setIsGameStarted(true);
    setTimer(setInterval(decrementTimer, 1000));
    setPointsTimer(setInterval(decrementPoints, 5000));
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    setIsGameStarted(false);
    
    if (userGuess === tracks[counter].track.id) {
      setIsCorrectGuess(true);
      setTotalPoints(totalPoints + availablePoints);
    } else {
      setIsCorrectGuess(false);
    }
    
    setCounter(counter + 1);
    
    setCountDownSeconds(30);
    setAvailablePoints(100);
    setUserGuess('');
    counter + 1 === tracks.length &&
    (await insertLeaderBoard({
      username: userProfile.username,
      user_id: userProfile.user_id,
      score: totalPoints,
      rounds: tracks.length,
    }));
  }
  

  const handleLeaderboardClick = () => {
    history.push('/leaderboard');
  };

  const handleChooseNewGameClick = () => {
    history.push('/selection');
  };
  

  function decrementTimer() {
    setCountDownSeconds((countDownSeconds) => countDownSeconds - 1);
  }
  
  function decrementPoints() {
    setAvailablePoints((availablePoints) => availablePoints - 10);
  }


  return (
    <div className='game-page'>
      <h2>Welcome to Tunify! Now name that tune!</h2>
      {!isGameStarted && <button onClick={handleStartGame}>Begin Round</button>}
      {counter !== 0 && <h2>{isCorrectGuess ? 'CORRECT!!!!' : 'WRONG ANSWER!'}</h2>}
      {counter === tracks?.length ? (
        <div className="completed-game-state">
          <p>{`CONGRATS YOU'VE COMPLETED ${tracks?.length} ROUNDS. Your total points were ${totalPoints}. Great job you nerd!`}</p>
          <button onClick={handleChooseNewGameClick}>Choose New Game</button>
          <button onClick={handleLeaderboardClick}>Go to Leader Board</button>
        </div>
      ) : (
        <div className="current-game-state">
          <h2>
            Current Round: {counter + 1}/{tracks?.length}
          </h2>
          <h2>Total Points: {totalPoints}</h2>
          {isGameStarted && <audio src={tracks[counter].track.preview_url} autoPlay></audio>}
          <h2>
            {countDownSeconds < 10
              ? `Countdown Timer: 00:0${countDownSeconds}`
              : `Countdown Timer: 00:${countDownSeconds}`}
          </h2>
          <h2>Avaliable Points : {availablePoints}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div name="userGuess" className="choices">
          {tracks &&
            tracksShuffled.map((track, i) => (
              <div key={track + i} className='radio'>
                <input
                  onChange={(e) => setUserGuess(e.target.value)}
                  type="radio"
                  name="userGuess"
                  value={track.track.id}
                />
                <p>{track.track.name}</p>
              </div>
            ))}
        </div>
        {userGuess ? <button>Submit Guess</button> : <button>Skip</button>}
      </form>
    </div>
  );
}
