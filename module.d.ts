declare namespace NodeJS {
  export interface ProccessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    jwtRefreshToken: string;
  }
}
