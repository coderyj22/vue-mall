import {request} from "./request";

export function getHome() {
  return request({
    url:'/home/multidata'
  })
}

export function getGoods(type,page) {
  return request({
    url:`/home/data?type=${type}&page=${page}`
  })
}

export function getDetail(id) {
  return request({
    url:`/detail?iid=${id}`
  })
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}
