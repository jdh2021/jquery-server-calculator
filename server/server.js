const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

const baseCalculationsArray = [];

app.post('/basecalculations', (req, res) => {
    console.log('in basecalculations POST');
    let baseCalculatorObject = req.body;
    switch(baseCalculatorObject.operatorBase) {
        case ('+'):
            baseCalculatorObject.total = Number(baseCalculatorObject.firstNumberBase) + Number(baseCalculatorObject.secondNumberBase);
            break;
        case ('-'):
            baseCalculatorObject.total = Number(baseCalculatorObject.firstNumberBase) - Number(baseCalculatorObject.secondNumberBase);
            break;
        case ('*'):
            baseCalculatorObject.total = Number(baseCalculatorObject.firstNumberBase) * Number(baseCalculatorObject.secondNumberBase);
            break;
        case ('/'):
            baseCalculatorObject.total = Number(baseCalculatorObject.firstNumberBase) / Number(baseCalculatorObject.secondNumberBase);
            break;
    }
    baseCalculationsArray.push(baseCalculatorObject);
    res.sendStatus(201);
})

app.get('/basecalculations', (req, res) => {
    console.log('in basecalculations GET');
    res.send(baseCalculationsArray);
})

app.listen(port, () => {
    console.log('listening on port', port);
})