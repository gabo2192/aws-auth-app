"use strict"

module.exports.hello = async event => {
  const expectedAnswer =
    event.request.privateChallengeParameters &&
    event.request.privateChallengeParameters.secretLoginCode

  if (event.request.challengeAnswer === expectedAnswer) {
    event.response.answerCorrect = true
  } else {
    event.response.answerCorrect = false
  }
  return event

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
