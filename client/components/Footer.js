import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="row">
          <div className="col l6 s12" id="footer-cont">
            <h5 className="white-text">SPRIG</h5>

            <div>
              <p className="grey-text text-lighten-4">Terms of service</p>
            </div>

            <div>
              <p className="grey-text text-lighten-4">About</p>
            </div>
            <div>
              <a href="/dashboard">
                <p className="grey-text text-lighten-4">Dashboard</p>
              </a>
            </div>
            <div>
              <p className="grey-text text-lighten-4">Made on the 25th floor</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container ">© 2019 Sprig Incorporated</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
