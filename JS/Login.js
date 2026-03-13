$(document).ready(function() {
    // $('#login_btn').prop('disabled', true);

    $('input').keyup(function() {
        var email = $('#txt_login_email').val();
        var password = $('#txt_login_password').val();

        if(email !== '' && password !== '') {
            $('#login_btn').prop('disabled', false);
        }
        else {
            $('#login_btn').prop('disabled', true);
        };
    });


    $('#txt_login_email').keyup(function() {

        var email = $(this).val();
        var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (emailPattern.test(email)) {
            $('#txt_login_email').css({'border': '2px solid green'}); 
            $('.txt_shown_error').html('');
        }

        else {
            $('#txt_login_email').css({'border': '2px solid red'});
            $('.txt_shown_error').html('Email must end with @gmail.com');
        };
    });

    $('#txt_login_password').keyup(function() {

        var password = $(this).val();

        if (password.length < 6) {
            $('#password_strength').html('Weak Password').css('color', 'red');
        }

        else if (password.length < 8) {
            $('#password_strength').html('Medium Password').css('color', 'orange');
        }
        
        else {
            $('#password_strength').html('Strong Password').css('color', 'green');
        }
    });


    $('#togglePassword').click(function() {

        var input = $('#txt_login_password');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        }
        else {
            input.attr('type', 'password');
        }
    });

    btnLog();
});


var btnLog = function() {
    $('#login_btn').click(function() {
        if(Validate()) {
            $.ajax({
                url:'../Data/users.json',
                method:'GET',
                success:function(data) {
                    console.log(data);

                    var email = $('#txt_login_email').val().trim();
                    var password = $('#txt_login_password').val().trim();

                    var loginSuccess = false;

                    $.each(data,function(i,user) {
                        if(user.email.toLowerCase() === email.toLowerCase() && user.password === password) {
                            loginSuccess = true;
                        }
                    });

                    if (loginSuccess) {
                        localStorage.setItem("user",email);
                        alert("Login Successfull");
                        window.location.href = "../HTML/Dashboard.html";
                        clearForm();
                    }
                    else {
                        alert('Invalid Login Details');
                    }
                },

                error:function() {
                    alert('JSON file not found');
                },
            });
        };
    });
};

var Validate = function() {
    $('.txt_shown_error').html('');

    var email = $.trim($('#txt_login_email').val());
    var password = $.trim($('#txt_login_password').val());
    var checkBox = $('#rember').is(':checked');
    var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;

    if (email === '') {
        $('.txt_shown_error').html('Enter Your Email ID');
        $('#txt_login_email').focus();
        return false;
    }

    else if (!emailPattern.test(email)) {
        $('.txt_shown_error').html('Email Must end up with @gmail.com Should like this');
        $('#txt_login_email').focus();
        return false;
    }

    else if (password === '') {
        $('.txt_shown_error').html('Enter Your Password');
        $('#txt_login_password').focus();
        return false;
    }

    else if (!passwordPattern.test(password)) {
        $('.txt_shown_error').html('Password Must contain Uppercase, Lowercase, Number and SpecialCharacter');
        $('#txt_login_password').focus();
        return false;
    }

    else if (!checkBox) {
        $('.txt_shown_error').html('Click the CheckBox and then submit the Form');
        $('#rember').closest('.form-check').css('color','red');
        return false;
    }
    return true;
}


var clearForm = function() {
    $('.txt_shown_error').html('');

    $('#txt_login_email').val('');
    $('#txt_login_password').val('');
    $('#rember').prop('checked', false);
}