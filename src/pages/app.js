import React, { useEffect } from "react"

import { AuthContext } from "../context/auth-context"
import Layout from "../components/layout"
import Login from "../components/login"
import { Auth } from "aws-amplify"

const App = () => {
  const { isAuthenticated } = React.useContext(AuthContext)
  useEffect(() => {
    const getTokens = async () => {
      const tokens = await Auth.currentSession()
      console.log(tokens)
    }
    getTokens()
  }, [])

  if (!isAuthenticated) {
    return (
      <Layout>
        <Login />
      </Layout>
    )
  }
  return (
    <Layout>
      <h1>Hey there</h1>
    </Layout>
  )
}

export default App
