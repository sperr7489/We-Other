const { pool } = require("../../config/database");
const { resultResponse, basicResponse } = require("../../config/response");
const baseResponseStatus = require("../../config/baseResponseStatus");
const commentDao = require("./commentDao");

// 특정 게시물에 댓글 달기 
exports.insertCommentOfPost = async (userIdx,postIdx,content)=>{
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // const insertParams = [userIdx, postIdx, content];
      //게시물 등록하기
    
      //insertId는 commentIdx와 직결된다. 
      const {insertId} =  await commentDao.insertCommentOfPost(connection, userIdx, postIdx, content);
      const [{createdAt}] = await commentDao.getCommentCreatedAt(connection,insertId);

      const orderResult = await commentDao.getOrderOfComment(connection,postIdx);

     let {order} = orderResult.find(x=>{
       return x.userIdx == userIdx;
     })
     const result = {"orderOfComment" : order,
     "createdAt" : createdAt,
     "commentIdx" : insertId
    }
      return resultResponse(baseResponseStatus.SUCCESS,result);
    } catch (error) {
      console.log(error);
      return basicResponse(baseResponseStatus.DB_ERROR);
    } finally {
      connection.release();
    }
}

// 댓글에 대댓 달기. 
exports.insertCommentOfComment= async (userIdx,postIdx,commentIdx,content)=>{
  const connection = await pool.getConnection(async (conn) => conn);
  try {
  const insertParams = [userIdx,postIdx,commentIdx,content];
  const {insertId} = await commentDao.insertCommentOfComment(connection,insertParams); 
  const [{createdAt}] = await commentDao.getCommentCreatedAt(connection,insertId);

  const orderResult = await commentDao.getOrderOfComment(connection,postIdx);
  let orderOfComment;
  orderResult.map(x=>{
    if(x.userIdx == userIdx){
     orderOfComment = x.order;
    }
  })
  const result = {
    "orderOfComment" : orderOfComment,
    "createdAt" : createdAt,
    "commentIdx" : insertId 
  }

  // 코멘트를 달았을 때 해당 익명에 대한 순서를 가져올 수 있어야한다. 
    return resultResponse(baseResponseStatus.SUCCESS,result);
  } catch (error) {
    console.log(error);
    return basicResponse(baseResponseStatus.DB_ERROR);
  } finally {
    connection.release();
  }
  
}