let tutorID = undefined;
let testUrl = undefined;
let tutor = undefined;



$(document).ready(function () {

    $('.list').click(function (event) {

        $(".dropdown-title").html($(this).text()+'<span class="caret"></span>');

    });
    $('.sauce-confirm').click(function (event) {
        $.ajax({
            type: 'POST',
            url: '/dashboard/confirm_lesson',
            data: {'id': event.currentTarget.id},
            success: function () {
                location.reload();
            }
        });
    });

    $('.sauce-decline').click(function (event) {
        $.ajax({
            type: 'POST',
            url: '/dashboard/decline_lesson',
            data: {'id': event.currentTarget.id},
            success: function () {
                location.reload();
            }
        });
    });

    $('#myTutors').click(function (event) {
        $.get('get_tutors', function (data) {
            if (data.length < 200) {
                $('#tutors-table').empty();
                var content = "<table>";
                content += '<th>' + 'First Name' + '</th>'+'<th>' + 'Last Name' + '</th>'+'<th>' + 'Check Availability' + '</th>';
                for (i = 0; i < data.length; i++) {
                    content += '<tr>' +'<td>' + data[i][0] + '</td>'+'<td>' + data[i][1] + '</td>' +'<td>' + '<a href='+ '/dashboard/availability/' + data[i][2] + '>' + '<p>' + 'Show Open Time Slots' + '</p>' + '</a>' + '</td>' + '</tr>';
                }
                content += "</table>";
                $('#tutors-table').append(content);
            }
        });
    });

    let url = window.location.pathname;
    testUrl = url.replace('/dashboard/', '');
    tutorID = url.replace('/dashboard/availability/', '');

    $.get('/dashboard/user_type', function (data) {
        let userType = data.user_type;
        tutor = data.id;
        if (userType === 'client') {
            if (document.getElementById("editAvailability")) {
                document.getElementById("editAvailability").style.display = "none";
            }
            if (document.getElementById('editAvailabilityButton')) {
                document.getElementById('editAvailabilityButton').style.display = "none";
            }
            if (document.getElementById("addTutor")) {
                document.getElementById("addTutor").style.display = "inline-block";
            }
        } else {
            if (document.getElementById("myTutors")) {
                document.getElementById("myTutors").style.display = 'none';
            }
            if (document.getElementById("editAvailability")) {
                document.getElementById("editAvailability").style.display = "inline-block";
            }
            if (document.getElementById('editAvailabilityButton')) {
                document.getElementById('editAvailabilityButton').style.display = 'inline-block';
            }
            if (document.getElementById('scheduleLesson')) {
                document.getElementById('scheduleLesson').style.display = 'none';
            }
        }
    });

    $('#myProfile').click(function(){
        window.open('/dashboard/my_profile', "_self");
    });

    $('#dashboard').click(function(){
        window.open('/dashboard/', "_self");
    });

    $('#editAvailabilityButton').click(function(){
        window.open('/dashboard/availability/' + tutor, "_self");
    });

    $('#addTutorModal').on('show.bs.modal', function (event) {
        let saveButton = $(this).find('#addTutorButton');
        saveButton.unbind().click(function () {
            let addedTutor = {};
            addedTutor.tutor_id = $('#tutorID').val();

            $('#addTutorModal').modal('toggle');

            $.ajax({
                type: 'POST',
                url: '/dashboard/add_tutor',
                data: addedTutor
            });
        });
    });


    if (testUrl === '') {
        $.get('get_tutors', function (data) {
            if (data.length < 200) {
                var content = "<table>";
                content += '<th>' + 'First Name' + '</th>'+'<th>' + 'Last Name' + '</th>'+'<th>' + 'Check Availability' + '</th>';
                for (i = 0; i < data.length; i++) {
                    content += '<tr>' +'<td>' + data[i][0] + '</td>'+'<td>' + data[i][1] + '</td>' +'<td>' + '<a href='+ '/dashboard/availability/' + data[i][2] + '>' + '<p>' + 'Show Open Time Slots' + '</p>' + '</a>' + '</td>' + '</tr>';
                }
                content += "</table>";
                $('#tutors-table').append(content);
            }
        });
    }
});

function sortTable(table, order) {
    var asc = order === 'asc',
        tbody = table.find('tbody');

    tbody.find('tr').sort(function(a, b) {
        if (asc) {
            return $('td:first', a).text().localeCompare($('td:first', b).text());
        } else {
            return $('td:first', b).text().localeCompare($('td:first', a).text());
        }
    }).appendTo(tbody);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
     beforeSend: function(xhr, settings) {
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});
