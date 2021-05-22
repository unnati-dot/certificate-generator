const express = require("express") 
const bodyParser = require("body-parser")
const cors = require("cors")
const pdf = require("html-pdf")
const pdfTemplate = require('./documents/template');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/create-pdf', (req, res) => {
    console.log(req.body);
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }


        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})
app.listen(PORT,()=>console.log(`server started at port : 5000`));