interface LoginResult {
  token: string;
}

interface LoginError {
  message: string;
  code: number;
  raw: any;
}
