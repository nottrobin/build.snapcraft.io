import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signOut } from '../../actions/auth-store';
import styles from './header.css';

class Header extends Component {
  render() {
    const { authenticated, user } = this.props;

    return (
      <div className={ styles.header }>
        <nav className={ styles.container }>
          <Link className={ styles.logo } to="/">
            snapcraft.io
          </Link>
          { authenticated
            ?
              <div className={ styles.sideNav }>
                { user && <a href={user.html_url} className={ styles.link }>{user.name}</a> }
                <Link to="/dashboard" className={ styles.link }>Dashboard</Link>
                <a
                  className={ styles.link }
                  onClick={ this.onLogoutClick.bind(this) }
                >
                  Log out
                </a>
              </div>
            :
              <div className={ styles.sideNav }>
                <a href="/auth/authenticate" className={ styles.link }>Log in</a>
              </div>
          }
        </nav>
      </div>
    );
  }

  onLogoutClick() {
    this.props.dispatch(signOut());
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.shape({
    login: PropTypes.string,
    name: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired
};

export default connect()(Header);
