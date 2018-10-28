export interface JwtPayload {
  id: string;
  hash: string;
  iat: number;
  exp: number;
}
