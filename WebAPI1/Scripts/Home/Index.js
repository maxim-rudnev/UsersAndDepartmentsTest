var departmentsTable;
var usersTable;

$(function () {
    // Initialization
    departmentsTable = $("#departmentsTable").DataTable({
        
        columns: [
            { "data": "Id" },
            { "data": "Title" }
        ],

        "ajax": {
            "url": "/api/department/getall",

            "dataSrc": function (json) {
                departmentsTable.clear().draw();
                departmentsTable.rows.add(json).draw();

            }
        },

        select: {
            style: 'single'
        }
    });

    renewDepartmentsSelect();

    

    // users table
    usersTable = $("#usersTable").DataTable({

        columns: [
            { "data": "Id" },
            { "data": "UserName" },
            { "data": "DepartmentId" },
            { "data": "Department" }
        ],

        "ajax": {
            "url": "/api/user/getall",
            
            "dataSrc": function (json) {
                usersTable.clear().draw();
                usersTable.rows.add(json).draw();
                
            }
        },

        select: {
            style: 'single'
        }
    });

    ////////////////////////

    
    // Event Handlers
    // ADD DEPARTMENT
    $('#addDepartmentForm').on("submit", function (e) {
        var messageBlock = $('#addDepartmentFormMessage');

        e.preventDefault();
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            //contentType: "application/json; charset=UTF-8",
            success: function (data, textStatus, exceptionThrown) {
                $('#addDepartmentModal').modal('toggle');

                renewDepartmentsList();
                renewDepartmentsSelect();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                var message = '<div>' + xhr.responseText + '</div>';

                messageBlock.append(message);
                
            }
        });
    });

    // EDIT DEPARTMENT
    $('#editDepartmentButton').on("click", function (e) {
        var idx = departmentsTable.cell('.selected', 0).index();
        var data = departmentsTable.rows(idx.row).data();

        $('#editDepartmentForm input[name="Id"]').val(data[0].Id);
        $('#editDepartmentForm input[name="Title"]').val(data[0].Title);

        $('#editDepartmentModal').modal('toggle');

    });

    $('#editDepartmentForm').on("submit", function (e) {
        var messageBlock = $('#editDepartmentFormMessage');

        e.preventDefault();
        $.ajax({
            url: this.action,
            type: 'put',
            data: $(this).serialize(),
            //contentType: "application/json; charset=UTF-8",
            success: function (data, textStatus, exceptionThrown) {
                $('#editDepartmentModal').modal('toggle');

                renewDepartmentsList();
                renewDepartmentsSelect();
                renewUsersList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                var message = '<div>' + xhr.responseText + '</div>';

                messageBlock.append(message);

            }
        });
    });

    // DELETE DEPARTMENT
    $('#deleteDepartmentButton').on("click", function (e) {
        var idx = departmentsTable.cell('.selected', 0).index();
        var data = departmentsTable.rows(idx.row).data();



        if (data.length === 0) alert('Не выбрано ни одного департамента');
        else {

            e.preventDefault();
            $.ajax({
                url: '/api/department/delete/' + data[0].Id,
                type: 'delete',
                //contentType: "application/json; charset=UTF-8",
                success: function (data, textStatus, exceptionThrown) {

                    renewDepartmentsList();
                    renewDepartmentsSelect();
                    renewUsersList();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert( xhr.responseText );

                }
            });


        }

        
    });

    ///////////////////////

    // ADD USER
    $('#addUserForm').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            //contentType: "application/json; charset=UTF-8",
            success: function (data, textStatus, exceptionThrown) {
                $('#addUserModal').modal('toggle');
                renewUsersList();

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    });

    // EDIT USER
    $('#editUserButton').on("click", function (e) {
        var idx = usersTable.cell('.selected', 0).index();
        var data = usersTable.rows(idx.row).data();

        $('#editUserForm input[name="Id"]').val(data[0].Id);
        $('#editUserForm input[name="UserName"]').val(data[0].UserName);

        var selectDepsOptions = $('#editUserForm select[name="DepartmentId"]')[0].options;

        
        selectDepsOptions.forEach( function (item) {
            if (item.val() === data[0].Id)
                item.attr('selected', true);
            else 
                item.attr('selected', false);
        });


        $('#editUserForm').modal('toggle');

    });


    // DELETE USER
    $('#deleteUserButton').on("click", function (e) {
        var idx = usersTable.cell('.selected', 0).index();
        var data = usersTable.rows(idx.row).data();



        if (data.length === 0) alert('Не выбрано ни одного департамента');
        else {

            e.preventDefault();
            $.ajax({
                url: '/api/user/delete/' + data[0].Id,
                type: 'delete',
                //contentType: "application/json; charset=UTF-8",
                success: function (data, textStatus, exceptionThrown) {

                    renewUsersList();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);

                }
            });


        }


    });
});

function renewUsersList() {
    try {
        usersTable.ajax.reload();
    }
    catch (ex) {
        alert(ex);
    }
}

function renewDepartmentsList() {
    try {
        departmentsTable.ajax.reload();
    }
    catch (ex) {
        alert(ex);
    }
}

function renewDepartmentsSelect() {
    $.ajax({
        type: 'GET',
        url: '/api/department/getall',
        dataType: 'json',
        success: function (data, status, req, xml, xmlHttpRequest, responseXML) {
            var departmentSelect = $('.departmentSelect');
            departmentSelect.empty();
            departmentSelect.append('<option selected>Department</option>');

            $.each(data, function (index, val) {
                var fullName = val.FirstName + ' ' + val.LastName;
                departmentSelect.append('<option value="' + val.Id + '">' + val.Id + ' - ' + val.Title + '</option>');

            });
        }

    });
}
