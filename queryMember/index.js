// 云函数入口文件
const cloud = require('wx-server-sdk');

// 与小程序端一致，均需调用 init 方法初始化
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // 
  const openId = event.openid ? event.openid : cloud.getWXContext().OPENID;
  let result = true;
  let member = {};

  try {
    member = await db.collection('member')
      .where({
        _openid: openId
      })
      .get();
  } catch (e) {
    // 没有查到。异常。
    result = false;
    console.log('queryMember error', e);
  }

  return {
    result: result,
    member: member,
  }
}