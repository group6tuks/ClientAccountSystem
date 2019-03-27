
$(document).ready(function () {
    $(".search").hide();
    $('.Deposit').hide();
    $('.Withdrawal').hide();

    $('#create').on('click', function () {
        $('.create').fadeIn(550);
        $('.Deposit').hide();
        $('.Withdrawal').hide();
        $('.search').hide();
    });

    $('#search').on('click', function () {
        $('.search').fadeIn(550);
        $('.Deposit').hide();
        $('.Withdrawal').hide();
        $('.create').hide();
    });

    $('#dep').on('click', function () {
        $('.Deposit').fadeIn(550);
        $('.search').hide();
        $('.Withdrawal').hide();
        $('.create').hide();
    });

    $('#withdraw').on('click', function () {
        $('.Withdrawal').fadeIn(550);
        $('.search').hide();
        $('.Deposit').hide();
        $('.create').hide();
    });

    $('#submitWithdrawal').on('click', function () {
        var id = $('#userID').val();
        var amount = $('#withdrawal').val();
        alert('i: '+id);
        alert('amount: '+amount);
        alert(model.logWithdrawalTransaction(id, amount))
    });
});