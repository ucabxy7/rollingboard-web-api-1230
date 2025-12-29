import { UserDto } from "./dto/user.dto";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly ADDRESS: string;
      readonly PORT: string;
      readonly DATABASE_URL: string;
      readonly COGNITO_USER_POOL_ID: string;
      readonly COGNITO_CLIENT_ID: string;
      readonly ENV: "development" | "staging" | "production";
      readonly AWS_COGNITO_CLIENT_ID: string;
      readonly AWS_COGNITO_USER_POOL_ID: string;
    }
  }
}
