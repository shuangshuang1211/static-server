const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')


const server = http.createServer((req, res) => {
  // const path = parse
  // console.log('req', req.url)
  let {pathname, query} = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  const absPath = path.join(`${__dirname}/src`, pathname)
  console.log("pathname", absPath)
  fs.stat(absPath, (err, stats) => {
    if (err) {
      res.statusCode = 404
      res.end('Not fund')
      return
    }
    if (stats.isFile()) {
      // 此时目录路径是一个文件可以直接读取回写
      readFile(absPath, res)
    } else {
      readFile(path.join(absPath, 'index.html'), res)
    }
  })
})
function readFile(path, res) {
  fs.readFile(path, (err, data) => {
    res.setHeader('Content-type', `${mime.getType(path)};charset=utf-8`)
    res.end(data)
  })
}
server.listen(1234, () => {
  console.log('sererve listening on 1234')
})