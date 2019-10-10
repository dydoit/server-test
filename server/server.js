const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const body = require('koa-better-body')
const mysql = require('mysql')
const co = require('co-mysql')
const JWT = require('koa-jwt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
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
server.use((ctx, next) => {
  return next().catch(err => {
    if(err.status===401) {
      ctx.status = 401
      ctx.body = {
        error:err.originalError ? err.originalError.message : err.message
      }
    }else {
      throw err;
    }
   })
})
const secret = 'vue-koa-demo'
server.use(JWT({
  secret
}).unless({
  path: [/\/login/]
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
          name: data[0].username
        }
        const token = jwt.sign({userToken}, secret, {expiresIn: 20*60})
        ctx.body = {
          message: '登录成功',
          token: token,
          username
        }
      }
    }

  }
})
router.post('/api/userInfo', async ctx => {
  let token = ctx.header.authorization.slice(7) // 切掉开头的Bearer
  let result = await jwt.verify(token, secret)
  let {username} = ctx.request.fields
  let {exp} = result
  console.log(exp)
  let willInvalid = moment().add(10, 'minutes').unix()
  let newToken = null
  if(willInvalid > exp) {
    // 10分钟后要失效的时候,更新一次token
    let expTime = moment().add(30, 'minutes').unix()
    newToken = jwt.sign({
      name: username,
      exp: expTime
    }, secret)
  }
  try {
    let data = await db.query(`SELECT * FROM user_info WHERE username='${username}'`)
    if(data.error) {
      dats.status = 400
      ctx.body = data.error
    }else {
      ctx.status = 200
      if(newToken) {
        ctx.body = {
          data: data[0],
          token:newToken // 派发一个新的token给客户端存着，下次就带上新的token过来请求接口， 请求头header上加上 Authorization: Bearer +token
        }
      }else {
        ctx.body = {
          data: data[0]
        }
      }
    }
  }catch(e) {
    ctx.throw(500)
  }
})
server.use(router.routes())

