import { city_data } from './area.data';
// 获取所有省份
export function getProvinces() {
  const provinces = [];
  for(const p in city_data) {
    provinces.push(p);
  }
  return provinces;
}
// 获取某个省份里面的城市
export function getCitiesByProvince(province) {
  if(!province || !city_data[province]) {
    return [];
  }
  const cities = [];
  const val = city_data[province]
  for(const c in val) {
    cities.push(c);
  }
  return cities;
}
// 获取某个省份某个城市里面的区县
export function getAreaByCity(province, city) {
  if(!province || !city_data[province] || !city_data[province][city]) {
    return [];
  }
  let areas = [];
  const val = city_data[province][city];
  areas = val;
  return areas;
}