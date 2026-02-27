$(document).ready(function () {

    // Login Button Click Event
    $('#login_btn').click(function () {
        btnLog();
    });

    function btnLog() {
        if (validate()) {
            alert('Successfully Your Login will created');
            clearForm();
        }
    }

    function validate() {

        // Clear old error message
        $('.txt_shown_error').html('');

        // CORRECT way to get values (DO NOT use val(''))
        var email = $.trim($('#txt_login_email').val());
        var password = $.trim($('#txt_login_password').val());
        var rember = $('#rember').is(':checked');

        // Step 1: Email Validation
        if (email === '') {
            $('.txt_shown_error').html('Enter Your Email First');
            $('#txt_login_email').focus();
            return false;
        }

        // Step 2: Password Validation
        if (password === '') {
            $('.txt_shown_error').html('Enter Your Password');
            $('#txt_login_password').focus();
            return false;
        }

        // Step 3: Checkbox Validation (Optional)
        if (!rember) {
            $('.txt_shown_error').html('Please click Remember Me checkbox');
            $('#rember').focus();
            return false;
        }

        return true;
    }

    function clearForm() {
        $('.txt_shown_error').html('');
        $('#txt_login_email').val('');
        $('#txt_login_password').val('');
        $('#rember').prop('checked', false);
    }

});