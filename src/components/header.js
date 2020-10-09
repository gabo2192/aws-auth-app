import React from "react"
import { Auth } from "aws-amplify"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"

import { AuthContext } from "../context/auth-context"

const Header = ({ siteTitle }) => {
  const { isAuthenticated, setIsAuth } = React.useContext(AuthContext)

  const handlSign = async () => {
    if (isAuthenticated) {
      await Auth.signOut()
      setIsAuth(false)
    }
    navigate("/app")
  }

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <button onClick={handlSign}>
          Sign {isAuthenticated ? "out" : "in"}{" "}
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
