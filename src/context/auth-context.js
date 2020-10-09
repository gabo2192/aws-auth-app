import React from "react"
import Amplify, { Auth } from "aws-amplify"

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-1:72c4e7dc-52c7-4f2e-ba94-5b01704e4c0b",

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_sL1sWJzOg",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "3f24nhke7s8cuecv4c99qtc6ft",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: "localhost",
      // OPTIONAL - Cookie path
      path: "/",
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      // sameSite: "strict" | "lax",
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: false,
    },

    // OPTIONAL - customized storage object
    // storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: "USER_PASSWORD_AUTH",

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: "hey Jude" },

    // OPTIONAL - Hosted UI configuration
    // oauth: {
    //     domain: 'your_cognito_domain',
    //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    //     redirectSignIn: 'http://localhost:3000/',
    //     redirectSignOut: 'http://localhost:3000/',
    //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    // }
  },
})

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [tokens, setTokens] = React.useState(null)

  React.useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated) {
        const awsUser = await Auth.currentUserInfo()
        setUser(awsUser)
        setIsAuthenticated(true)
        const tokens = await Auth.currentUserCredentials()
        setTokens(tokens)
        return
      }
      setUser(null)
      setIsAuthenticated(false)
      setTokens(null)
    }
    getUser()
  }, [isAuthenticated])

  const setIsAuth = React.useCallback(isAuth => {
    setIsAuthenticated(isAuth)
  }, [])
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, tokens, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
