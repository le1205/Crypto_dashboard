const resCode = {
  SUCCESS: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NO_EXIST: 404,
  VALIDATION_ERROR: 406,
  ALREADY_EXIST: 407,

  INTERNAL_SERVER_ERROR: 500,
  INVALID_USER: 410,
  PASSWORD_NOT_EQUAL: 411,
  USER_NOT_VERIFIED: 412,

  VERIFY_CODE_INCORRECT: 413,
  USER_IS_BANNED: 414,
  CURRENT_PASSWORD_INCORRECT: 415,

  ALREADY_LOGIN: 417,

  NOT_ACTIVE_SUBSCRIPTION: 418,
};

const resMessage = {
  BAD_REQUEST: "Bad request!",
  FORBIDDEN: "Not token provided",
  UNAUTHORIZED: "Unauthorized!",
  NO_EXIST: "No Exist",
  CREATED: "Created Success",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  SUCCESS: "Success",
  INVALID_USER: "Username or Password is incorrect",
  CURRENT_PASSWORD_INCORRECT: "Current Password is incorrect",
  PASSWORD_NOT_EQUAL: "Confirm password must be equal with password",
  ALREADY_EXIST: "The Email already exist",
  CREATE_FAILED: "Create failed",
  DELETE_FAILED: "Delete failed",
};

module.exports = {
  resCode,
  resMessage,
};
