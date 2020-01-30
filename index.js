


//prvo smo dugme odradili; znaci kad kliknemo na dugme nesto treba da se desi. 
// kad kliknemo na dugme zelimo da nam se ispise u konzoli objekat koji ima tri elementa: type, description i value
//tako smo napravili funkciju koja vraca objekat koji u sebi ima ta tri propertija
//nismo napravili samo objekat jer to bi znacilo da input uvek ima istu vrednost i ne bi moglo da se menja 
// objekat se prikazuje u konzoli, ali treba da se prikaze i na DOM, sto smo i uradili 

// insertAdjacentHTML parsira tekst u html konstrukciju i na taj nacin nadogradjuje html strukturu(event nasledjivanje)

//onda smo hteli da vrednosti da smestimo u odredjena polja u DOM, ali pre toga smo njihove vrednosti odredili preko JS - promenljiva za sve expenses, za sve incomes i total u gornjem polju

//zato su ta polja dobila svoje promenljive, znaci promenljiva za incomes, expenses, total

// postoje i promenjlive za nizove objkata koje smo napravili i u pocetku su to prazni nizovi koji ce se popunjavati svaki put kad kliknemo na button


//event delegation - upotrebili smo je kada smo zeleli da obrisemo html elemenat na delete dugme... znaci, prvo smo uneli u funkciju event argument, a uz property event.target smo precizirali html element koji smo kliknuli... kada smo precizirali html element koji cemo kliknuti, onda smo nasli html najveci parent koji ce biti izbrisan na klik (parentNode). Zatim smo upotrebili property .remove() i izbrisali element

//sada hocemo da oduzmemo ili saberemo vrednost total na koji ce uticati brisanje hmtl elementa. prvo smo nasli html element u kom se nalazi konkretno vrednost koja je ispisana... onda smo dosli do zakljucka da ako je income da se total smanjuje, a ako e=je expense onda se povecava. putanja potrage html elementa je uvek od onog koji je targetiran


var incomes = [];
var expenses = [];

var totalIncome = 0;
var totalExpense = 0;
var total;

emptyValues();
getMonth();


document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
        addItems();
    }
})

document.querySelector(".add__btn").addEventListener('click', function () {
    addItems();
});

document.querySelector('.add__type').addEventListener('change', function () {
    document.querySelector('.add__btn').classList.toggle('red');
})

// INPUT

var input = function () {
    return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value
    }
}

function addToArray() {
    if (input().type === 'inc') {
        incomes.push(input());
        console.log(incomes);


    } else if (input().type === 'exp') {
        expenses.push(input());
        console.log(expenses);

    }
}

function addToDom() {
    var html, element, newHTML;

    if (input().type === 'inc') {
        element = '.income__list';

        html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    } else if (input().type === 'exp') {
        element = '.expenses__list';

        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'


    }

    if (input().type === 'inc') {
        totalIncome = totalIncome + Number(input().value);


    } else if (input().type === 'exp') {
        totalExpense = totalExpense + Number(input().value)
    }

    total = totalIncome - totalExpense;

    newHTML = html.replace('%id%', input().description);
    newHTML = newHTML.replace('%description%', input().description);
    newHTML = newHTML.replace('%value%', input().value);

    document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    document.querySelector('.budget__income__value').textContent = '+ ' + totalIncome;
    document.querySelector('.budget__expenses__value').textContent = '- ' + totalExpense;
    document.querySelector('.budget__value').textContent = total;
}

document.querySelector('.container__clearfix').addEventListener('click', function (event) {

    var elementDOM, element_value, elementID;

    elementDOM = event.target.parentNode.parentNode.parentNode.parentNode;
    elementDOM.remove();

    elementID = elementDOM.id.split('-');
    console.log(elementID[0]);
    //split pretvara string u niz i uklanja on sto je u zagradi

    element_value = event.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].data; //vrednost u stringu

    if (elementID[0] === 'expense') {
        total = total + Number(element_value)
        document.querySelector('.budget__value').textContent = total;

    } else if (elementID[0] === 'income') {
        total = total - Number(element_value)
        document.querySelector('.budget__value').textContent = total;
    }
})

function emptyValues() {
    document.querySelector('.add__description').value = "";
    document.querySelector('.add__value').value = 0;
}

function getMonth() {
    var date = new Date()
    var month = date.getMonth();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    var getMonth = months[month];
    var year = date.getFullYear();

    document.querySelector('.budget__title--month').textContent = getMonth + ', ' + year;

}

function addItems() {

    addToArray();
    addToDom();
    emptyValues();
}