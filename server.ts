import express from "express"
import fs from 'fs'
import showdown from 'showdown'

// convert mardown file to html
const resumeMd = fs.readFileSync(__dirname + '/src/resume.md', 'utf8')
const convertToHtml = new showdown.Converter()
const css = `
<link rel='stylesheet' type='text/css' href='https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css' />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
<link rel='stylesheet' type='text/css' href='src/resume.css' />`
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
