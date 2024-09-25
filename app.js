let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let option = document.querySelectorAll("select");
let from = document.querySelectorAll(".from");
let to = document.querySelectorAll(".to");
let fromCurr = document.querySelector(".from select ");

let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".main #mypara");
const updateFlag = ((eve) => {
    let country_flag = countryList[eve.value];
    //console.log(countryList[eve.value]);
    let newSrc = `https://flagsapi.com/${country_flag}/flat/64.png`;
    let img = eve.parentElement.querySelector("img");
    img.src = newSrc;

})

const ExchangeRate = async () => {
    //access the input button
    let amount = document.querySelector(".inputField input");
    if (amount.value < 1 || amount.value == "") {
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    //console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    //console.log(rate);

    let finalAmount = amount.value * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


for (let select of option)//returns values of object
{
    for (let country in countryList) //returns keys
    {
        //console.log(country);
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if (select.name == "from" && country == "USD") {
            newOption.selected = "slected";
        }
        else if (select.name == "to" && country == "INR") {
            newOption.selected = "slected";
        }
        select.appendChild(newOption);
        //flag add
        select.addEventListener("change", (event) => {
            updateFlag(event.target);
            //console.log(event.target);
        })

    }

}


const btn = document.querySelector("button");
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    ExchangeRate();
})




