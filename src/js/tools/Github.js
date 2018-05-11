import Ajax from 'ajax-request';

const BASE_URL = 'https://api.github.com/users/';

export default class Github {

  static getUserInformations(username, fn) {
    Ajax(`${BASE_URL}${username}`, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        fn(undefined, JSON.parse(body))
      } else {
        console.log(res)
      }
    })
  }

  static getUserRepository(username, fn) {
    Ajax(`${BASE_URL}${username}/repos`, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        fn(undefined, JSON.parse(body))
      } else {
        console.log(res)
      }
    })
  }

  static getAllUserDatas(username, fn) {
    Github.getUserInformations(username, (err, user) => {
      Ajax(user.repos_url, (err, res, body) => {
        if (!err && res.statusCode === 200) {
          fn(undefined, {
            image: user.avatar_url,
            username: user.login,
            url: user.url,
            bio: user.bio,
            name: user.name,
            company: user.company,
            blog: user.blog,
            location: user.location,
            email: user.email,
            repos: JSON.parse(body)
          })
        } else {
          fn(res, undefined)
        }
      })
    })
  }

}