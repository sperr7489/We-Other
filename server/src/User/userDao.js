exports.insertUser = async (connection, insertUserParams) => {
  const insertUserQuery = `
     INSERT INTO user (email, passwd, userName, department, sex, admission)
        VALUES (?,?,?,?,?,?);    
    `;
  const [insertUserRow] = await connection.query(
    insertUserQuery,
    insertUserParams
  );
  return insertUserRow;
};
exports.emailCheck = async (connection, email) => {
  const emailCheckQuery = `
    select exists (
    select * from user where email = ?
    ) as exist
`;
  const [emailCheckRow] = await connection.query(emailCheckQuery, email);
  return emailCheckRow;
};

exports.userNameCheck = async (connection, userName) => {
  const userNameCheckQuery = `
    select exists (
        select * from user where userName = ?
        ) as exist
    `;
  const [userNameCheckRow] = await connection.query(
    userNameCheckQuery,
    userName
  );
  return userNameCheckRow;
};

exports.signInCheckPasswd = async (connection, email) => {
  const signInCheckPasswdQuery = `
        select passwd from user 
        where email = ?;
    `;
  const [[signInCheckPasswdRow]] = await connection.query(
    signInCheckPasswdQuery,
    email
  );
  return signInCheckPasswdRow;
};
exports.getUserInfo = async (connection, email) => {
  const getUserIdxQuery = `
    select userIdx,userName from user 
    where email = ?;
  `;
  const [[getUserIdxRow]] = await connection.query(getUserIdxQuery, email);
  console.log(getUserIdxRow);
  return getUserIdxRow;
};
exports.insertRefreshToken = async (connection, userIdx, refreshToken) => {
  const insertRefreshTokenQuery = `
    insert into token(userIdx,refreshToken) value(?,?);
  `;
  const [insertRefreshTokenRow] = await connection.query(
    insertRefreshTokenQuery,
    [userIdx, refreshToken]
  );

  return insertRefreshTokenRow;
};
