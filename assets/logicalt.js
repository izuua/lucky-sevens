let startingBet = 0;
// let gameWins = 0;
let rolls = 0;
let highestWinnings = 0;
let highestRoll = 0;
let gamesPlayed = 1;
let userMoney = 0;
// let gameOver = false;

const Random = (min, max) => {
    return Math.floor((Math.random() * max) + min)
}

const updateButton = gamesPlayed => {
    if (gamesPlayed > 0) {
        $('#play').html('Play Again');
    }
}

const round = () => {
    updateButton(gamesPlayed);
    gamesPlayed++;

    let dice1 = Random(1, 6);
    let dice2 = Random(1, 6);
    let diceTotal = dice1 + dice2;

    // console.log(dice1);
    // console.log(dice2);

    rolls++;
    console.log(`rolls = ${rolls}`);
    console.log(`diceTotal = ${diceTotal}`);


    if (diceTotal === 7) {
        userMoney += 4;
        if (userMoney > highestWinnings) {
            highestWinnings = userMoney;
            highestRoll = rolls;
        }
    } else {
        userMoney -= 1;
    }



    // console.log('rolled')
    console.log(`money = ${userMoney}`);
    // console.log(`highest winning = ${highestWinnings}`);


    // if (userMoney > 0) {
    //   round(userMoney);
    // } else {
    //   results();
    // }

}

const gameStart = () => {
    // console.log(userMoney)
    // highestWinnings = userMoney;
    rolls = 0;
    highestWinnings = 0;
    highestRoll = 0;
    console.log(`New Game! Bet = ${userMoney}`)

    // round(userMoney);

    while (userMoney > 0) {
        round(userMoney);
    }

    results();

}

const results = () => {
    // console.log('results ran');
    $('#table-start-bet').html(`$${startingBet.toFixed(2)}`);
    $('#table-rolls').html(rolls);
    $('#table-highest-won').html(`$${highestWinnings.toFixed(2)}`);
    $('#table-highest-roll').html(highestRoll);

    $('#results').removeAttr('hidden');
}

// $('#results').hide();

$('.btn').on('click', function (event) {
    event.preventDefault();

    // console.log('clicked');

    userMoney = $('#starting-bet').val().trim();

    userMoney = userMoney.replace(/\$/g, '');
    userMoney = parseFloat(userMoney);

    // console.log(userMoney);

    if (userMoney <= 0 || isNaN(userMoney)) {
        return alert("You must bet more than $0.");
    }

    startingBet = userMoney;

    $('#starting-bet').val("");

    gameStart(userMoney);
})



//following code is to make the input form only accept currency
$('input[data-type="currency"]').on({
    keyup: function () {
        formatCurrency($(this));
    },
    blur: function () {
        formatCurrency($(this), 'blur');
    }
});


function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === '') { return; }

    // original length
    var original_len = input_val.length;

    // initial caret position 
    var caret_pos = input.prop('selectionStart');

    // check for decimal
    if (input_val.indexOf('.') >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf('.');

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === 'blur') {
            right_side += '00';
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = '$' + left_side + '.' + right_side;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = '$' + input_val;

        // final formatting
        if (blur === 'blur') {
            input_val += '.00';
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}