import React from "react"
import { Auth } from "aws-amplify"
import { AuthContext } from "../context/auth-context"

const Confirm = props => {
  const [email, setEmail] = React.useState("")
  const [code, setCode] = React.useState("")

  const { setIsAtuh } = React.useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email && !code) {
      return
    }

    const response = await Auth.confirmSignUp(email, code)
    console.log(response)
    const session = await Auth.currentSession()
    session ? setIsAtuh(true) : setIsAtuh(false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Confirm</h1>
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
        Code:
        <input
          type="number"
          name="code"
          value={code}
          onChange={e => {
            setCode(e.target.value)
          }}
        />
      </label>

      <input type="submit" value={"Confirm"} />
    </form>
  )
}

export default Confirm
