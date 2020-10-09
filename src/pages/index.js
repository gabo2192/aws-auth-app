import React, { useEffect } from "react"
import { Link } from "gatsby"
import CryptoJS from "crypto-js"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  function decryptAmiAES(
    password,
    encryptedMessage,
    config = { keySize: 256, iterations: 1 }
  ) {
    const { keySize } = config
    const { iterations } = config
    const salt = CryptoJS.enc.Hex.parse(
      encryptedMessage.substr(encryptedMessage.length - 32)
    )
    const iv = CryptoJS.enc.Hex.parse(
      encryptedMessage.substr(encryptedMessage.length - 64, 32)
    )
    const encrypted = encryptedMessage.substr(0, encryptedMessage.length - 64)
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      hasher: CryptoJS.algo.SHA512,
      iterations: iterations,
    })
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })
    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8)
    if (!decryptedMessage) {
      throw new Error("Decrypt Error")
    }
    return decryptedMessage
  }
  useEffect(() => {
    const token = decryptAmiAES(
      "YWNb!vdEW?82FJRJA*$EXB6cMU&BDe4EX-awwLpzNw2$d735h3",
      "MDIh5hg7GPYTFA087yhTf+zgVuKICCjC1zh6KHijpIl/tI9y6luViQNvyqyQsgrv601d7328b23ecfae9661b05642a9f6966714c84d4901648c4ed552565b7bbbe0"
    )
    console.log(token)
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage
