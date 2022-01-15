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

const getCSV = function(data) {
    const rows = [];
    const headers = Object.keys(data[0]);

    rows.push(headers.join(','));
    for(const row of data) {
        const values = headers.map(header => {
            return row[header];
        });
        rows.push(values.join(","));
    }
    return rows.join('\n');
}

$(".export").click(function() {
    var request = {
        "url": `http://localhost:3000/api/products`,
        "method": "GET",
    };

    $.ajax(request).done(function(response) {
        const data = response.map(row => ({
            name: row.name,
            price: row.price,
            units: row.units,
            category: row.category
        }));

        const csv = getCSV(data);

        // Download function
        const blob = new Blob([csv], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const temp = document.createElement('a');
        temp.setAttribute('hidden', '');
        temp.setAttribute('href', url);
        temp.setAttribute('download', 'products.csv');
        document.body.appendChild(temp);
        temp.click();
        document.body.removeChild(temp);
    });

})