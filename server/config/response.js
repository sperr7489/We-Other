const basicResponse = ({ isSuccess, code, message }) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
  };
};

const resultResponse = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  };
};

module.exports = {
  basicResponse,
  resultResponse,
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
};
