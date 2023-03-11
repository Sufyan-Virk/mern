class HTTPError extends Error {
  constructor(message, errorCode, data) {
    super(message);
    this.code = errorCode;
    this.data = data ? data : undefined;
  }
}

export default HTTPError;
