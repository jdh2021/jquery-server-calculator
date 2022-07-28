console.log('javascript sourced');

$(readyNow);

function readyNow() {
    console.log('jQuery sourced');
    //base calculator click event handlers
    $('.operator-button').on('click', getOperatorBase);
    $('#equal-button').on('click', getNumbersBase);
    $('#clear-button').on('click', clearNumbersBase);
    baseCalculationsFromServer();
    //stretch calculator click event handlers
    clearNumbersStretch();
    $('.number-button-stretch').on('click', getNumbersStretch);
    $('.operator-button-stretch').on('click', getOperatorStretch);
    $('#equal-button-stretch').on('click', stretchCalculatorToServer);
    $('#clear-button-stretch').on('click', clearNumbersStretch);
    $('body').on('click', '.fa-arrows-rotate', recalculate);
    $('body').on('click', '.fa-eraser', deleteCalculationHistory);
    stretchCalculationsFromServer();
}

//object for base calculator
const baseCalculatorObject = {
    firstNumberBase: '',
    operatorBase: '' ,
    secondNumberBase: '',
};

/** 
 * Stores operator in base calculator object.
*/
function getOperatorBase() {
    console.log('in getOperatorBase');
    baseCalculatorObject.operatorBase = $(this).data('operator');
}

/** 
* Stores first number input and second number input in base calculator object. 
*/
function getNumbersBase() {
    console.log('in getNumbersBase');
    baseCalculatorObject.firstNumberBase = $('#first-number').val();
    baseCalculatorObject.secondNumberBase = $('#second-number').val();
    console.log(baseCalculatorObject);
    baseCalculatorToServer();
}

/** 
* Makes a POST request to server to send base calculator object. If POST is successful, calls baseCalculationsFromServer for GET request.
@return Returns false if required inputs are not completed.
*/
function baseCalculatorToServer () {
    if ($('#first-number').val() === '' || baseCalculatorObject.operatorBase === '' || $('#second-number').val() === ''){
        alert('You haven\'t completed all fields.');
        return false;
    } else {
        $.ajax({
            method: 'POST',
            url: '/basecalculations',
            data: baseCalculatorObject
        }).then(function(response) {
            console.log('Back from POST:', response);
            baseCalculationsFromServer();
            clearNumbersBase();
        }).catch(function(error) {
            console.log('Error', error);
            alert('There\'s an error.');
        });
    }
}

/** 
* Makes a GET request to server to retrieve baseCalculationsArray. Loops through the array and appends the calculation total, first number, operator, and second number to the ul element baseCalculationsHistory.
*/
function baseCalculationsFromServer() {
    $.ajax({
        method: 'GET',
        url: '/basecalculations'
    }).then(function(response) {
        console.log('Base calculations from server:', response);
        $('#base-calculations-result').empty();
        $('#base-calculations-history').empty();
        let baseCalculations = response;
        for(let calculation of baseCalculations) {
            $('#base-calculations-result').html(`${calculation.total}`);
            $('#base-calculations-history').append(`
                <li>${calculation.total} = ${calculation.firstNumberBase} ${calculation.operatorBase} ${calculation.secondNumberBase}</li>
            `);
        } 
    })
}

/** 
* Sets the value of the number input fields and the base calculator object properties to undefined.
*/
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

/** 
* A conditional checks whether an operator has been entered to assign property of either first number or second number. $(this).data accesses the value of the input clicked on to store as firstNumberStretch and secondNumberStretch properties of stretch calculator object. Calls displayInput.
*/
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

/** 
* Stores operator in stretch calculator object. Calls displayInput.
*/
function getOperatorStretch() {
    console.log('in getOperatorStretch');
    stretchCalculatorObject.operatorStretch = $(this).data('value');
    displayInput();
}

/** 
* Displays the input in the stretch calculator field by targeting the stretch-calculation-field and replacing the html with an  input containing the stretch calculator object properties obtained in getNumbersStretch and getOperatorStretch.
*/
function displayInput() {
    console.log('in displayInput');
    $('#stretch-calculation-field').html(`<input type="text" class="full-width" readonly value=
    "${stretchCalculatorObject.firstNumberStretch} ${stretchCalculatorObject.operatorStretch} ${stretchCalculatorObject.secondNumberStretch}">`);
}

/** 
* Makes a POST request to server to send stretch calculator object. If POST is successful, calls stretchCalculationsFromServer for GET request.
@return Returns false if required inputs are not completed.
*/
function stretchCalculatorToServer () {
    if ((stretchCalculatorObject.firstNumberStretch !== '' && stretchCalculatorObject.operatorStretch !== '' && stretchCalculatorObject.secondNumberStretch === '') ||
        (stretchCalculatorObject.firstNumberStretch !== '' && stretchCalculatorObject.operatorStretch === '' && stretchCalculatorObject.secondNumberStretch === '') ||
        (stretchCalculatorObject.firstNumberStretch === '' && stretchCalculatorObject.operatorStretch === '' && stretchCalculatorObject.secondNumberStretch === '')) {
            alert('You haven\'t entered the needed information to perform a calculation.');
            return false;
    } else {
        $.ajax({
            method: 'POST',
            url: '/stretchcalculations',
            data: stretchCalculatorObject
        }).then(function(response) {
            console.log('Back from POST:', response);
            stretchCalculationsFromServer();
            clearNumbersStretch();
        }).catch(function(error) {
            console.log('Error', error);
            alert('There\'s an error.');
        });
    }
}

/** 
* Makes a GET request to server to retrieve stretchCalculationsArray. Loops through the array and appends the calculation total, first number, operator, and second number to the ul element stretch-history.
*/
function stretchCalculationsFromServer() {
    $.ajax({
        method: 'GET',
        url: '/stretchcalculations'
    }).then(function(response) {
        console.log('Stretch calculations from server:', response);
        $('#stretch-history').empty();
        let stretchCalculations = response;
        for (let calculation of stretchCalculations) {
            $('#stretch-history').append(`
                <li><span class="fa-li"><i class="fa-solid fa-calculator"></i></span>
                <span class="stretch-total calc-total">${calculation.total}</span> 
                = <span class="calc-first-number">${calculation.firstNumberStretch}</span> 
                <span class="calc-operator"">${calculation.operatorStretch}</span> 
                <span class="calc-second-number">${calculation.secondNumberStretch}</span>
                <span class="btn btn-sm"><i class="fa-solid fa-arrows-rotate"></i></span></li>
            `);
        }       
    }).catch(function(error) {
        console.log('Error', error);
        alert('There\'s an error.');
    });
}

/** 
* Sets the value of the stretch calculator object properties to undefined. Targets the stretch-calculation-field and replaces the html with an input without a value. 
*/
function clearNumbersStretch() {
    console.log('in clearNumbersStretch');
    $('#stretch-calculation-field').html(`<input type="text" class="full-width" readonly>`);
    stretchCalculatorObject.firstNumberStretch = '';
    stretchCalculatorObject.operatorStretch = '';
    stretchCalculatorObject.secondNumberStretch = '';
    console.log(stretchCalculatorObject);
}

/** 
* Makes a DELETE request to server to delete historical calculation objects in stretchCalculationsArray. Calls stretchCalculationsFromServer to confirm all entries have been removed.
*/
function deleteCalculationHistory() {
    console.log('in deleteCalculationHistory');
    $.ajax ({
        type: 'DELETE',
        url: '/stretchcalculations',
    }).then(function(response) {
        console.log('Back from DELETE:', response);
        stretchCalculationsFromServer();
    }).catch(function(error) {
        console.log('Error:', error);
        alert('There\'s an error.');
    });
}

/** 
* Makes a POST request to server to re-run a historical calculation. Uses $(this) and siblings class to retrieve first number, operator and second number. Server searches for first number, operator, and second number within stretchCalculationsArray on server and sends calculation object with total back to client. Total is appended by targeting the stretch-calculation-field. stretch calculator object properties are set to undefined to allow for next calculation.
*/
function recalculate() {
    stretchCalculatorObject.firstNumberStretch = ($(this).parent().siblings('.calc-first-number').text());
    stretchCalculatorObject.operatorStretch = ($(this).parent().siblings('.calc-operator').text());
    stretchCalculatorObject.secondNumberStretch = ($(this).parent().siblings('.calc-second-number').text());
    $.ajax({
        method: 'POST',
        url: '/recalculations',
        data: stretchCalculatorObject
    }).then(function(response) {
        console.log('Recalculation from server:', response);
        $('#stretch-calculation-field').html(`<input type="text" class="full-width" readonly value="${response.total}">`);
        stretchCalculatorObject.firstNumberStretch = '';
        stretchCalculatorObject.operatorStretch = '';
        stretchCalculatorObject.secondNumberStretch = '';
    }).catch(function(error) {
        console.log('Error', error);
        alert('There\'s an error.');
    });
}
