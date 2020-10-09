import React from "react"
import { navigate } from "gatsby"
import { Auth } from "aws-amplify"
import { AuthContext } from "../context/auth-context"

const Login = props => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [signUp, setSignUp] = React.useState(false)

  const { setIsAuth } = React.useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) {
      return
    }
    const answer = "hey"

    if (signUp) {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      })
      navigate("/confirm")
    }

    if (!password) {
      const user = await Auth.signIn(email)
      await Auth.sendCustomChallengeAnswer(user, answer)
      const session = await Auth.currentSession()
      if (session) {
        setIsAuth(true)
      }
      return
    }

    await Auth.signIn(email, password)

    const session = await Auth.currentSession()
    if (session) {
      setIsAuth(true)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "200px" }}
    >
      <h1>Login</h1>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
      </label>
      <br />
      <p>
        <button onClick={() => setSignUp(c => !c)}>
          {!signUp ? "Create an account" : "Login"}
        </button>
      </p>
      <p>
        <input type="submit" value={signUp ? "Register" : "Login"} />
      </p>
    </form>
  )
}

export default Login
