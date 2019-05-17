import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="largContain">
        <div style={{ height: '75vh' }} className="container valign-wrapper">
          <div className="row">
            {/* <h4 style={{ margin: '85px' }} className="flow-text">
            <b>Welcome</b> to Sprig <br />
            <br />
            <span style={{ fontFamily: 'comic sans', margin: '5px' }}>
              SAVE $$$
            </span>{' '}
            with Sprig
          </h4> */}
            <img
              src="/homeLogo.png"
              height="250"
              style={{ display: 'block', margin: 'auto' }}
            />
            <div className="par">sprig has sprung</div>
            <br />
            <div className="spacer3">
              <div className="s6 rowz ">
                <Link
                  to="/register"
                  style={{
                    width: '240px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className="btn btn-large waves-effect waves-light hoverable btnThings accent-3"
                  id="register"
                >
                  Register
                </Link>
              </div>
              <div className=" s6 rowz">
                <Link
                  to="/login"
                  style={{
                    width: '240px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                  }}
                  className="btn btn-large waves-effect waves-light hoverable btnThings accent-3"
                  id="login"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
