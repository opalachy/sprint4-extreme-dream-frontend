import HttpService from './http.service.js'

export const reviewService = {
  addReview
}


async function addReview(review) {
    console.log(review)
  return await HttpService.post(`review`, review)
}