import { Message } from 'element-ui';

// 手机号验证
function checkPhone(phone) {
  const reg = /^[1][3456789][0-9]{9}$/;
  return reg.test(phone);
}

// 邮箱验证
function checkMail(mail) {
  const reg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
  return reg.test(mail);
}

// 身份证号验证
function checkIdNumber(val) {
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  const code = val.substring(17);
  if (p.test(val)) {
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

// 网址验证
function checkUrl(url) {
  const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
  return reg.test(url);
}

// 统一社会信用代码验证
function checkLicense(code) {
  let result = true
  const reg = /^([159Y]{1})([1239]{1})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY]{1})$/;
  result = reg.test(code)
  const str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
  const ws = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
  const codeArr = []
  let sum = 0
  codeArr[0] = code.substr(0, code.length - 1);
  codeArr[1] = code.substr(code.length - 1, code.length);
  for (let i = 0; i < codeArr[0].length; i++) {
    const AnCode = codeArr[0].charAt(i);
    const AnCodeValue = str.indexOf(AnCode);
    sum += AnCodeValue * ws[i];
  }
  const indexOfCode18 = 31 - (sum % 31);
  const code18 = str.charAt(indexOfCode18);
  if (code18 != codeArr[1]) {
    result = false
  }
  return result;
}

// 获取数组中key=value的那个对象
function getObjectInArrayByKey(arr, key, value) {
  for (let v in arr) {
    let element = arr[v]
    if (typeof (element) == 'object') {
      let result = getObjectInArrayByKey(element, key, value)
      if (result) return result;
    } else {
      if (v == key) {
        if (element == value) return arr;
      }
    }
  }
}

// 生成随机整数
function randomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// 复制内容到剪贴板
function copyStr(str) {
  let createTextarea = document.createElement('textarea');
  createTextarea.readOnly = 'readonly';
  createTextarea.value = str;
  document.body.appendChild(createTextarea);
  createTextarea.select();
  document.execCommand('Copy');
  document.body.removeChild(createTextarea);
  Message({
    message: '内容已复制到剪贴板',
    type: 'success',
    duration: 1500
  });
}

// axios请求回调
function axiosCb(res, sCb, fCb) {
  if (res.code === 0) {
    sCb && sCb()
    Message({
      message: res.msg,
      type: 'success',
      duration: 1500
    })
  } else {
    fCb && fCb()
    Message({
      message: res.msg,
      type: 'error',
      duration: 1500
    })
  }
}

export const util = {
  checkPhone,
  checkMail,
  checkIdNumber,
  checkUrl,
  checkLicense,
  getObjectInArrayByKey,
  randomInteger,
  copyStr,
  axiosCb
}