class SuccessResponse {
    constructor(message, data = null, statusCode) {
      this.success = true;
      this.message = message;
      this.data = data;
      this.statusCode = statusCode
    }
  }
  
  class ErrorResponse {
    constructor(message, statusCode = 500, errors = null) {
      this.success = false;
      this.message = message;
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }
  
export { SuccessResponse, ErrorResponse };