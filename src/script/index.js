var filters = [];
var data = undefined;

fetch("/src/data/data.json")
    .then(response => response.json())
    .then(result => {

        result.forEach(r => {
            r.nueva = r.new;
        });

        console.log(result)

        data = result;

        updateList();
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
    const onClickFilter = (name) => {
        let find = false;
        filters.forEach((f) => {
            if (f === name) {
                find = true;
            }
        })
        if (find === false) {
            filters.push(name);
            updateFilters();
            updateList();
        }
    }

    const listFilter = container.querySelector(".list__itemFilters");
    languages.forEach(l => {
        const p = document.createElement("p");
        p.addEventListener('click', () => onClickFilter(l));
        p.innerText = l
        listFilter.appendChild(p)
    })

    tools.forEach(t => {
        const p = document.createElement("p");
        p.addEventListener('click', () => onClickFilter(t));
        p.innerText = t
        listFilter.appendChild(p)
    })





    return container;
}

const createHTMLFilter = (name) => {

    const listContainer = document.querySelector(".filters__actives");

    const container = document.createElement("div");
    container.className = "filters__activesBox"


    container.innerHTML = `
    <p>${name}</p>
    <div class="filters__activesClearIco">
        <img src="./src/images/icon-remove.svg" alt="">
    </div>
`
    const imgRemove = container.querySelector(".filters__activesClearIco");

    imgRemove.addEventListener("click", () => {
        listContainer.removeChild(container);
        filters.forEach((f, index) => {
            if (f === name) {
                filters.splice(index, 1);
            }
        })
        updateFilters();
        updateList();
    })



    return container;
}

const updateFilters = () => {
    const listContainer = document.querySelector(".filters__actives");
    listContainer.innerHTML = "";

    filters.forEach(f => {
        listContainer.appendChild(createHTMLFilter(f))
    })


}

const updateList = () => {
    const lista = document.querySelector(".list");
    lista.innerHTML = "";

    data.forEach(d => {
        var find = false;

        filters.forEach(f => {
            d.languages.forEach(l => {
                if (l === f) {
                    find = true;
                }
            })
            d.tools.forEach(t => {
                if (t === f) {
                    find = true;
                }
            })
        })


        if (find === true || filters.length === 0) {
            lista.appendChild(createHTMLItem(d))
        }



    });

}

const clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
    filters = [];
    updateFilters();
    updateList();
})
