const util  = require('util')
const fs = require('fs')

let mainReadFile = util.promisify(fs.readFile)
mainReadFile('./public/content.txt').then(value => {
    console.log(value.toString())
})