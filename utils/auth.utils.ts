import { CognitoJwtVerifier } from "aws-jwt-verify";

export const idTokenVerifier = CognitoJwtVerifier.create({
  tokenUse: "id",
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
});
