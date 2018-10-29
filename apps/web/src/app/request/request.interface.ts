export interface IRequest {
  hostname: string;
  originalUrl: string;
  referer: string;
  token: {
    csrf: string;
    jwt: string;
  };
}
