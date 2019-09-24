import { GB2260 } from './identity.data';

// 获取身份证中关于地址和出生日期的信息
export const extractInfo = (identityNo) => {
  // 返回输入身份证的前6位
  const addrCode = identityNo.slice(0,6);
  const dateOfBirth = identityNo.slice(6,14);
  const data = {
    'addrCode': addrCode,
    'dateOfBirth': dateOfBirth
  }
  return data;
}

// 验证输入的身份证前6位是不是存在的(合法)
export const isValidAddr = (addrCode) => {
  return addrCode in GB2260;
}

// 根据地址码获取省市县信息
export const getAddrByCode = (addrCode) => {
  const province = GB2260[addrCode.slice(0,2) + '0000'];
  // relpace是将某某省去掉
  const city = GB2260[addrCode.slice(0,4) + '00'].replace( province, '');
  const district = GB2260[addrCode].replace( province + city, '');
  return {
    province: province,
    city: city,
    district: district
  }
}