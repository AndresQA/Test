/*
$.ajax({
    type: "POST",
    url: "/src/data/data.json",
    complete: (e, xhr, settings) => {

    }
}).done((data) => {
    var obj = JSON.parseJSON(data)

    console.log(obj, "JSON")

    // etc

});*/

fetch("/src/data/data.json")
    .then(response => response.json())
    .then(obj => {

        console.log(obj)



    })