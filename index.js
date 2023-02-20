var express = require('express')
var cors = require('cors')
require('dotenv').config()

var app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })

app.post('/api/fileanalyse', upload.single('upfile'), async function (req, res) {
  try {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    const file = req.file
    if (!file)
      throw new Error('No file uploaded')
    
    res.json({
      statusCode: 200,
      statusMessage: 'File uploaded successfully',
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  } catch (error) {
    res.json({
      statusCode: 400,
      statusMessage: error.message
    })
  }
});


const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
