import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <footer class="footer">
        <div class="row">
          <div class="col l6 s12" id="footer-cont">
            <h5 class="white-text">SPRIG</h5>
            <div>
              <p class="grey-text text-lighten-4">Terms of service</p>
            </div>

            <div>
              <p class="grey-text text-lighten-4">About</p>
            </div>
            <div>
              <a href="/dashboard">
                <p class="grey-text text-lighten-4">Dashboard</p>
              </a>
            </div>
            <div>
              <p class="grey-text text-lighten-4">Made on the 25th floor</p>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container ">© 2019 Sprig Incorporated</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
