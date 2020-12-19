## 个人 jsbox 脚本集合

[jsbox 文档](https://docs.xteko.com/#/)

本地开发时新建 `jsbox.config.js` 文件

```js
module.exports = {
  GITHUB_TOKEN: '<你的 Github token>',
  GITHUB_POST_URL: 'https://api.github.com/repos/<你的 Github 用户名>/<你的 Github 仓库>/issues',
  DOUBAN_COOKIE: 'dbcl2="<你的豆瓣 Cookie>";',
  DOUBAN_POST_URL: 'https://www.douban.com/',
}
```

### 1. send-to-github

将信息保存到 Github issues 中

### 2. send-to-douban

发送豆瓣广播