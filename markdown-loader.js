const { marked } = require('marked')
module.exports = (source) => {
  console.log(source)
  const html = marked(source)

  return `module.exports=${JSON.stringify(html)}`
}
