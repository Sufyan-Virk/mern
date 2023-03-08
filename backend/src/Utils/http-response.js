class HTTPResponse {
  constructor(data, message){
    this.success = true
    this.message = message
    this.data = data ? data : undefined
  }
};

export default HTTPResponse;
