import express from "express"
import fs from 'fs'
import showdown from 'showdown'

// convert mardown file to html
const resumeMd = fs.readFileSync(__dirname + '/resume.md', 'utf8')
const convertToHtml = new showdown.Converter()
const css = `
<link rel='stylesheet' type='text/css' href='https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css'>
<link rel='stylesheet' type='text/css' href='resume.css'>`
let resumeHtml = css + convertToHtml.makeHtml(resumeMd)

// initialise express application
const app: express.Application = express()
const port = 3000
// use '/' as the static file so that we can use html with css
app.use(express.static(__dirname+'/'))
app.get(`/`, (_, res) => {
	res.send(resumeHtml)
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})
