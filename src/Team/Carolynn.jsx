import React from 'react';
import Rodal from 'rodal';
// import '../About.css';

// include styles
import 'rodal/lib/rodal.css';

class Carolynn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
    const audio = document.querySelector('#audioFavSong');
    this.props.joshFavSong && audio.load();
    this.props.joshFavSong && audio.play();
  }

  hide() {
    this.setState({ visible: false });
    const audio = document.querySelector('#audioFavSong');
    this.props.joshFavSong && audio.pause();
  }

  render() {

    const customStyles = {
      height: 'auto',
      bottom: 'auto',
      top: '30%',
      backgroundColor: '#61dafb',
      color: 'rgb(255,101,195)',
    };

    return (
      <div className='dev'>
        <div className="found" onClick={this.show.bind(this)}>
          {/* <button>show</button> */}
          <img className='profile-pic' src="/plague-doctor-profile.png" alt="Josh" />
          <div className='about-text'>
            <p>Name: Carolynn</p>
            <p>Title: Software Engineer</p>
            <p>Genre: 90s RnB</p>
          </div>
        </div>

        <Rodal className='modal' visible={this.state.visible} onClose={this.hide.bind(this)} width={550} height={250}
          customStyles={customStyles}
        >
          <div className='dev-name'>Carolynn</div>
          <div className='wrapper-music'>
            <img className='profile-pic' src="/plague-doctor-profile.png" alt="Carolynn" />
            <p>
              My name is Carolynn. I ....{' '}
            </p>
            {this.props.joshFavSong && (
              <audio id="audioFavSong" src={this.props.joshFavSong}></audio>
            )}
          </div>
        </Rodal>
      </div>
    );
  }
}

export default Carolynn;