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
    .then(result => {

        result.forEach(r => {
            r.nueva = r.new;
        });

        console.log(result)


        const lista = document.querySelector(".list");

        result.forEach(r => {
            lista.appendChild(createHTMLItem(r))
        });

    })

const createHTMLItem = ({
    id,
    company,
    logo,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
    nueva
}) => {

    const container = document.createElement("div");
    container.className = "list__item"

    container.innerHTML = `
        <div class="list__itemHover">

        </div>
        <img class="list_itemImg" src="${logo}" alt="">

            <div class="list__itemInfo">
                <div class="list__itemCompany">
                    <p class="companyName">${company}</p>
                    ${nueva == true ? `<div class="reg">
                    <p>NEW!</p>
                </div>`: ""}
                    ${featured == true ? ` <div class="reg">
                    <p>FEATURED</p>
                </div>` : ""}
                   
                </div>
                <div class="list__itemCompany">
                    <h4>${position}</h4>
                </div>
                <div class="list__itemCompanyDetail">
                    <p>${postedAt}</p>
                    <p class="space">•</p>
                    <p>${contract}</p>
                    <p class="space">•</p>
                    <p>${location}</p>
                </div>

            </div>

            <div class="list__itemFilters">

            </div>
`

    const listFilter = container.querySelector(".list__itemFilters");
    languages.forEach(l => {
        const p = document.createElement("p");
        p.innerText = l
        listFilter.appendChild(p)
    })
    
    tools.forEach(t =>{
        const p = document.createElement("p");
        p.innerText = t
        listFilter.appendChild(p)
    })





    return container;
}