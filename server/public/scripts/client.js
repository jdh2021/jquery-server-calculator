console.log('javascript sourced');

$(readyNow);

function readyNow() {
    console.log('jQuery sourced');
    //base calculator click event handlers
    $('.operator-button').on('click', getOperatorBase);
    $('#equal-button').on('click', getNumbersBase);
    $('#clear-button').on('click', clearNumbersBase);
    //stretch calculator click event handlers
    $('.number-button-stretch').on('click', getNumbersStretch);
    $('.operator-button-stretch').on('click', getOperatorStretch);
    $('#equal-button-stretch').on('click', stretchCalculatorToServer);
    $('#clear-button-stretch').on('click', clearNumbersStretch);
    $('body').on('click', '.fa-arrows-rotate', recalculate);
    $('body').on('click', '.fa-eraser', deleteCalculationHistory);
}

//object for base calculator
const baseCalculatorObject = {
    firstNumberBase: '',
    operatorBase: '' ,
    secondNumberBase: '',
};

//store operator in base calculator object
function getOperatorBase() {
    console.log('in getOperatorBase');
    baseCalculatorObject.operatorBase = $(this).data('operator');
}

//store first number input and second number input in base calculator object
function getNumbersBase() {
    console.log('in getNumbersBase');
    baseCalculatorObject.firstNumberBase = $('#first-number').val();
    baseCalculatorObject.secondNumberBase = $('#second-number').val();
    console.log(baseCalculatorObject);
    baseCalculatorToServer();
}

//make POST request to server to send base calculator object
function baseCalculatorToServer () {
    $.ajax({
        method: 'POST',
        url: '/basecalculations',
        data: baseCalculatorObject
    }).then(function(response) {
        console.log('Back from POST', response);
        baseCalculationFromServer();
        clearNumbersBase();
    }).catch(function(error) {
        console.log('Error', error);
        alert('There\'s an error.');
    })
}

//make GET request from server to get base calculations
function baseCalculationFromServer() {
    $.ajax({
        method: 'GET',
        url: '/basecalculations'
    }).then(function(response) {
        console.log('Calculation from server', response);
        $('#baseCalculationsResult').empty();
        $('#baseCalculationsHistory').empty();
        let baseCalculations = response;
        for(let calculation of baseCalculations) {
            $('#baseCalculationsResult').html(`${calculation.total}`);
            $('#baseCalculationsHistory').append(`
                <li>${calculation.total} = ${calculation.firstNumberBase} ${calculation.operatorBase} ${calculation.secondNumberBase}</li>
            `);
        } 
    })
}

// clear base calculator input values and object properties
function clearNumbersBase() {
    console.log('in clearNumbersBase');
    $('#first-number').val('');
    $('#second-number').val('');
    baseCalculatorObject.firstNumberBase = '';
    baseCalculatorObject.operatorBase = '';
    baseCalculatorObject.secondNumberBase = '';
    console.log(baseCalculatorObject);
};

//object for stretch calculator
const stretchCalculatorObject = {
    firstNumberStretch: '',
    operatorStretch: '',
    secondNumberStretch: '',
}

//store first and second number input in stretch calculator object
function getNumbersStretch() {
    console.log('in getNumbersStretch');
    if(stretchCalculatorObject.operatorStretch === '') {        
        stretchCalculatorObject.firstNumberStretch += $(this).data('value');
    } else {
        stretchCalculatorObject.secondNumberStretch += $(this).data('value');
    }
    console.log(stretchCalculatorObject);
    displayInput();
}

//store operator in stretch calculator object
function getOperatorStretch() {
    console.log('in getOperatorStretch');
    stretchCalculatorObject.operatorStretch = $(this).data('value');
    displayInput();
}

//display input in stretch calculation field
function displayInput() {
    console.log('in displayInput');
    $('#stretchCalculationField').html(`<input type="text" class="full-width" readonly value="${stretchCalculatorObject.firstNumberStretch} ${stretchCalculatorObject.operatorStretch} ${stretchCalculatorObject.secondNumberStretch}">`);
}

//make POST request to server to send stretch calculator object
function stretchCalculatorToServer () {
    $.ajax({
        method: 'POST',
        url: '/stretchcalculations',
        data: stretchCalculatorObject
    }).then(function(response) {
        console.log('Back from POST', response);
        clearNumbersStretch();
    }).catch(function(error) {
        console.log('Error', error);
        alert('There\'s an error.');
    })
}

//clear stretch calculator input values and object properties
function clearNumbersStretch() {
    console.log('in clearNumbersStretch');
    $('#stretchCalculationField').html(`<input type="text" class="full-width" readonly>`);
    stretchCalculatorObject.firstNumberStretch = '';
    stretchCalculatorObject.operatorStretch = '';
    stretchCalculatorObject.secondNumberStretch = '';
    console.log(stretchCalculatorObject);
}

//delete history of calculations stretch history
function deleteCalculationHistory() {
    console.log('in deleteCalculationHistory');
}

//rerun the historical calculation in stretch calculator
function recalculate() {
    console.log('in recalculate');
}