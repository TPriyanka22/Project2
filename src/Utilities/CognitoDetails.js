import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { config as AWSConfig } from 'aws-sdk'
const dotenv = require('dotenv');
dotenv.config();
//import appConfig from '../Config/appconfig.json'

AWSConfig.region = "us-east-1";
export default {
  createCognitoAuth,
  createCognitoUser,
  createCognitoUserPool,
  getCognitoSession,
  getCognitoSignInUri,
  parseCognitoWebResponse,
  signOutCognitoSession
}


// Creates Cognito User
const createCognitoUser = () => {
  const userpool = createCognitoUserPool()
  return userpool.getCurrentUser()
}

// Creates Cognito UserPool
const createCognitoUserPool = () => {
  //var appConfig = JSON.parse(localStorage.getItem("appConfig"));
  return new CognitoUserPool({  
    UserPoolId: "us-east-1_MSU7IZUSK",
    ClientId: "1ftvsvppqssummhdmja3mkqptp"
  })
}

const getCognitoSignInUri = () => {
  //var appConfig = JSON.parse(localStorage.getItem("appConfig"));
  console.log("in geturi",process.env.REACT_APP_callbackUri);
  const signinUri = "https://driveinapp.auth.us-east-1.amazoncognito.com/login?client_id=1ftvsvppqssummhdmja3mkqptp&response_type=token&scope=email+openid+profile&redirect_uri=https://showtimedrivein.com/Redirect"
  return signinUri
}

const signOutCognitoSession = () => {
  const auth = createCognitoAuth()
  auth.signOut()
}

const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser()
    cognitoUser.getSession((err, result) => {
      if (err || !result) {
        reject(new Error('Failure getting Cognito session: ' + err))
        return
      }
      const session = {
        credentials: {
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.token
        },
        user: {
          userName: result.idToken.payload['cognito:username'],
          email: result.idToken.payload.email,
          groups:result.idToken.payload['cognito:groups']
        }
      }
      resolve(session)
    })
  })
}

const parseCognitoWebResponse = (href) => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth()

    // userHandler will trigger the promise
    auth.userhandler = {
      onSuccess: function (result) {
        localStorage.setItem("result",result);
        console.log("parseCognitoWebResponse  : ",result);
        resolve(result)
      },
      onFailure: function (err) {
        var res = localStorage.getItem("result");
        resolve(res);
        //reject(new Error('Failure parsing Cognito web response: ' + err))
      }
    }
    auth.parseCognitoWebResponse(href)
    //console.log("done parseCognitoWebResponse ");
  })
}

const createCognitoAuth = () => {
  //var appConfig = JSON.parse(localStorage.getItem("appConfig"));
  var token = [
    "openid",
    "email",
    "profile"
  ]
  const appWebDomain = ("https://driveinapp.auth.us-east-1.amazoncognito.com").replace('https://', '').replace('http://', '')
  const auth = new CognitoAuth({
    UserPoolId: "us-east-1_MSU7IZUSK",
    ClientId: "1ftvsvppqssummhdmja3mkqptp",
    AppWebDomain: appWebDomain,
    TokenScopesArray: token,
    RedirectUriSignIn: "https://showtimedrivein.com/Redirect",
    RedirectUriSignOut: "https://showtimedrivein.com"
  })
  return auth
}

