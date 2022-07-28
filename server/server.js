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
});

app.get('/basecalculations', (req, res) => {
    console.log('in basecalculations GET');
    res.send(baseCalculationsArray);
});

const stretchCalculationsArray = [];

app.post('/stretchcalculations', (req, res) => {
    console.log('in stretchcalculations POST');
    let stretchCalculatorObject = req.body;
    switch(stretchCalculatorObject.operatorStretch) {
        case ('+'):
            stretchCalculatorObject.total = Number(stretchCalculatorObject.firstNumberStretch) + Number(stretchCalculatorObject.secondNumberStretch);
            break;
        case ('-'):
            stretchCalculatorObject.total = Number(stretchCalculatorObject.firstNumberStretch) - Number(stretchCalculatorObject.secondNumberStretch);
            break;
        case ('*'):
            stretchCalculatorObject.total = Number(stretchCalculatorObject.firstNumberStretch) * Number(stretchCalculatorObject.secondNumberStretch);
            break;
        case ('/'):
            stretchCalculatorObject.total = Number(stretchCalculatorObject.firstNumberStretch) / Number(stretchCalculatorObject.secondNumberStretch);
            break;
    }
    stretchCalculationsArray.push(stretchCalculatorObject);
    res.sendStatus(201);
});

app.post('/recalculations', (req, res) => {
    console.log('in recalculations POST');
    let recalculatorObject = req.body;
    for (let calculation of stretchCalculationsArray) {
        if ((recalculatorObject.firstNumberStretch === calculation.firstNumberStretch) && 
            (recalculatorObject.operatorStretch === calculation.operatorStretch) &&
            (recalculatorObject.secondNumberStretch === calculation.secondNumberStretch))
        res.send(calculation);
    }
});

app.get('/stretchcalculations', (req, res) => {
    console.log('in stretchcalculations GET');
    res.send(stretchCalculationsArray);
});

app.delete('/stretchcalculations', (req, res) => {
    console.log('in stretchcalculations DELETE');
    stretchCalculationsArray.splice(0, stretchCalculationsArray.length);
    console.log(stretchCalculationsArray);
    res.send(stretchCalculationsArray); 
});

app.listen(port, () => {
    console.log('listening on port', port);
});