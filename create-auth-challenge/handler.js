"use strict"

module.exports.hello = async event => {
  let secretLoginCode
  if (!event.request.session || !event.request.session.length) {
    secretLoginCode = "hey-jude"
  } else {
    const previousChallenge = event.request.session.slice(-1)[0]
    secretLoginCode =
      previousChallenge.challengeMetadata &&
      previousChallenge.challengeMetadata.match(/CODE-(\d*)/) &&
      previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1]
  }
  event.response.publicChallengeParameters = {
    email: event.request.userAttributes.email,
  }

  event.response.privateChallengeParameters = { secretLoginCode }
  event.response.challengeMetadata = `CODE-${secretLoginCode}`

  return event

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
