$(document).ready(function() {
  $('#loginModal').on('shown.bs.modal', function () {
    $('#emailInput').trigger('focus')
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  });

  $('#signUp').on('click', function () {
    $('#loginModal').modal('toggle');
  });

  $('#login').on('click', function () {
    $('#signUpModal').modal('toggle');
    $('#loginModal').modal('toggle');
  });

  document.getElementById('id_email').autofocus = true;
  document.getElementById('id_email').setAttribute("placeholder", "Email")
  document.getElementById('id_username').autofocus = false;
  document.getElementById('id_username').classList.add('form-control');
  document.getElementById('id_username').setAttribute("placeholder", "Username")
  document.getElementById('id_password1').classList.add('form-control');
  document.getElementById('id_password1').setAttribute("placeholder", "Password")
  document.getElementById('id_password2').classList.add('form-control');
  document.getElementById('id_password2').setAttribute("placeholder", "Confirm Password")
  document.getElementById('id_email').classList.add('form-control');
  document.getElementById('id_email').required = true;
  document.getElementById('id_username').classList.add('form-control');
  document.getElementById('id_tutor_or_student').classList.add('form-inline');
  document.getElementById('id_tutor_or_student_0').setAttribute("checked", "checked");
});
