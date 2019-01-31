(function () {


    let btn = document.getElementById("play"),
        firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line');

    function updateData(param) {
        let newData = [];
        param.forEach(elm => {
            newData.push({
                url: newUrl(elm.url),
                name: newName(elm.name),
                description: newDescription(elm.description),
                date: newDate(elm.date)
            })

        });
        return newData;
    }

    function newUrl(param) {
        return (param.startsWith('http://')) ?
            `${param}` : `${'http://'}${param}`;
    }

    function newDescription(param) {
        return (param.length > 15) ?
            `${param.substring(0,15)}...` :
            param;
    }
    let newDate = param => moment(param).format('YYYY/MM/DD, HH:mm ');
    let newName = param => {
        return `${param[0].toUpperCase()}${param.substring(1).toLowerCase()}`
    };

    function selectAmount(prm, arr) {
        let view;
        switch (prm) {
            case "1":
                view = arr.slice(0, 3);
                break;
            case "2":
                view = arr.slice(0, 6);
                break;
            default:
                view = arr.slice();
        }
        return view;
    }

    function selectType(type, view) {
        if (type === "1") {
            replace(view);
        } else if (type === "2") {
            template(view);
        } else if (type === "3") {
            galleryElement(view);
        } else {
            alert("-Выбирете один из вариантов-")
        }
    }

    function replace(array) {
        var replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';
        let resultHTML = "";
        for (let i = 0; i < array.length; i++) {
            resultHTML += replaceItemTemplate
                .replace(/\$name/gi, array[i].name)
                .replace("$url", array[i].url)
                .replace("$description", array[i].description)
                .replace("$date", array[i].date);
        }
        firstBlock.innerHTML = resultHTML;
        document.querySelector('.first-group').classList.add("show");
    }

    function template(el) {
        let secondItemTemplate = [];
        el.forEach(function (item) {
            secondItemTemplate += `<div class="col-sm-3 col-xs-6">\
<img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
<div class="info-wrapper">\
    <div class="text-muted">${item.name}</div>\
    <div class="text-muted top-padding">${item.description}</div>\
    <div class="text-muted">${item.date}</div>\
</div>\
</div>`;
        })

        secondBlock.innerHTML = secondItemTemplate;
        document.querySelector('.second-group').classList.add("show");

    }

    function galleryElement(param) {
    
        param.forEach(item => {
            parent = document.createElement("div");
            parent.className ="col-sm-3 col-xs-6";

            let child = document.createElement("img");
            child.src = item.url;
            child.alt = item.name;
            child.className = "img-thumbnail";
            parent.appendChild(child);

            let elmDiv = document.createElement("div");
            elmDiv.className = "info-wrapper";
            parent.appendChild(elmDiv);

            let innDivOne = document.createElement("div");
            innDivOne.className = "text-muted";
            let txtNode = document.createTextNode(item.name);
            innDivOne.appendChild(txtNode);
            elmDiv.appendChild(innDivOne);

            let innDivTwo = document.createElement("div");
            innDivTwo.className = "text-muted top-padding";
            let txtNodeDescrp = document.createTextNode(item.description);
            innDivTwo.appendChild(txtNodeDescrp);
            elmDiv.appendChild(txtNodeDescrp);

            let innDivThree = document.createElement("div");
            innDivThree.className = "text-muted";
            let txtNodeDate = document.createTextNode(item.date);
            innDivThree.appendChild(txtNodeDate);
            elmDiv.appendChild(innDivThree);

            thirdBlock.appendChild(parent);
        })
        document.querySelector('.third-group').classList.add("show");
    }
    function clean(){
        firstBlock.innerHTML = "";
        secondBlock.innerHTML = "";
        thirdBlock.innerHTML = "";
        document.querySelector('.second-group').classList.remove("show");
        document.querySelector('.first-group').classList.remove("show");
        document.querySelector('.third-group').classList.remove("show");
    }
    function init(data) {
        clean();
        let array = updateData(data);
        let type = document.getElementById("type-selector").value
        let amount = document.getElementById("line-selector").value
        let getAmount = selectAmount(amount, array);
        selectType(type, getAmount);
    }

    btn.addEventListener("click", init.bind(null, data));

})()