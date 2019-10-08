const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const body = require('koa-better-body')
const mysql = require('mysql')
const co = require('co-mysql')
const jwt = require('jsonwebtoken')
let cnn = mysql.createPool({
  connectionLimit:10,
  host: 'cdb-3knwpmdf.gz.tencentcdb.com',
  port: '10086',
  user:'root',
  password: 'dengyin_2019',
  database:'20190926'
})
let db = co(cnn)
let server = new Koa()
server.use(cors({
  'origin': ''
}))
server.use(body({
  uploadDir: './static/upload'
}))
let router = new Router()
server.listen(3000, ()=> {
  console.log('koa is listening 8080')
})
router.post('/login', async ctx => {
  let {username, password} = ctx.request.fields
  if(!username||!password) {
    ctx.body = {error: 1, msg: '用户名和密码不能为空'}
  } else {
    let data = await db.query(`SELECT * FROM user WHERE username='${username}'`)
    if(!data.length) {
      ctx.body = {error: 1, msg: '用户名不存在'}
    }else {
      if(password!=data[0].password) {
        ctx.body = {error: 1, msg: '用户名或者密码不对'}
      }else {
        // 如果用户名密码正确
        const userToken = {
          name: data[0].username,
          id: data[0].id
        }
        const secret = 'vue-koa-demo'
        const token = jwt.sign({userToken}, secret, {expiresIn: 10*60})
        console.log(token)
        // 登录成功派发token
        ctx.body = {error: 0, msg: '登录成功', token}
      }
    }

  }
})
// router.get('/userInfo', async ctx => {
//   let {id} = ctx.query
//   if(!id) {
//     ctx.body = {error:1, msg: '用户id不能为空'}
//   }else {

//   }
// })
server.use(router.routes())

