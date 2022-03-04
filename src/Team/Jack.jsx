import React from 'react';
import Rodal from 'rodal';
// import '../About.css';

// include styles
import 'rodal/lib/rodal.css';

class Jack extends React.Component {
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
          <img className='profile-pic' src="/anubis.svg" alt="Josh" />
          <div className='about-text'>
            <p>Name: Jack K</p>
            <p>Title: Software Engineer</p>
            <p>Genre: Classic Rock</p>
          </div>
        </div>

        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} width={550} height={250} customStyles={customStyles}>
          <div className='dev-name'>Jack K</div>
          <div className='wrapper-music'>
            <img className='profile-pic' src="/anubis.svg" alt="Clay" />
            <p>
              My name is Jack. I ...{' '}
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

export default Jack;
