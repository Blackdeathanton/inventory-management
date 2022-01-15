$("#addProduct").submit(function(event) {
    alert("Product added successfully");
});

$("#updateProduct").submit(function(event) {
    event.preventDefault();
    var arr = $(this).serializeArray();
    console.log(arr);
    var data = {};

    $.map(arr, function(n, i) {
        data[n['name']] = n['value'];
    });
    console.log(data.id);
    var request = {
        "url": `http://localhost:3000/api/products/${data.id}`,
        "method": "PUT",
        "data": data
    };

    $.ajax(request).done(function(response) {
        alert("Product updated successfully");
    });
});

if(window.location.pathname == '/') {
    ondelete = $(".table tbody td a.delete");
    ondelete.click(function() {
        var id = $(this).attr("data-id");
        console.log(id);
        var request = {
            "url": `http://localhost:3000/api/products/${id}`,
            "method": "DELETE",
        }

        console.log(request);
        if(confirm("Are you sure? ")) {
            $.ajax(request).done(function(response) {
                alert("Product deleted successfully");
                location.reload();
            });
        }
    })
}