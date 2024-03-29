document.addEventListener("DOMContentLoaded", function () {
    let currencyButtons1 = document.querySelectorAll(".currency-first button");
    let currencyButtons2 = document.querySelectorAll(".currency-second button");
  
    document.querySelector(".currency-first button.right-rub").classList.add("selected");
    document.querySelector(".currency-second button.left-usd").classList.add("selected");
    currencyButtons1.forEach(function (button) {
      button.addEventListener("click", function () {
        currencyButtons1.forEach(function (btn) {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
        updateExchangeRate2();
      });
    });
  
  
    currencyButtons2.forEach(function (button) {
      button.addEventListener("click", function () {
        currencyButtons2.forEach(function (btn) {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
        updateExchangeRate();
      });
    });
  
    document.getElementById("cost-first").addEventListener("input", function () {
      document.getElementById("cost-first").addEventListener("keyup", (event) => {
        if (event.target.value.split("")[0] == "." || event.target.value.split("")[0] == "-") {
          let arr = event.target.value.split("");c
          arr.shift();
          event.target.value = Number(arr.join(""));
          updateConvertedAmount(Number(event.target.value, "cost-second", ".currency-second button.selected", ".currency-first button.selected", ".rate"))
  
        } else {
          updateConvertedAmount("cost-first", "cost-second", ".currency-second button.selected", ".currency-first button.selected", ".rate");
  
        };
      })
  
    });
  
    document.getElementById("cost-second").addEventListener("input", function () {
  
      document.getElementById("cost-second").addEventListener("keyup", (event) => {
  
        if (event.target.value.split("")[0] == "." || event.target.value.split("")[0] == "-") {
          let arr = event.target.value.split("");
          arr.shift();
          event.target.value = Number(arr.join(""));
          updateConvertedAmount(Number(event.target.value, "cost-first", ".currency-second button.selected", ".currency-first button.selected", ".rate2"))
  
        } else {
  
          updateConvertedAmount("cost-second", "cost-first", ".currency-second button.selected", ".currency-first button.selected", ".rate2");
  
        };
      })
  
    });
    updateExchangeRate();
  
  });
  
  function updateExchangeRate() {
    let toCurrency = document.querySelector(".currency-second button.selected").textContent;
    let fromCurrency = document.querySelector(".currency-first button.selected").textContent;
  
  
    let apiKey = 'c174d32b2e9d0faba28bb49f';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let exchangeRate = data.rates[toCurrency];
        let rateElement = document.querySelector(".rate");
        let rateElement2 = document.querySelector(".rate2");
        rateElement2.textContent = `1 ${toCurrency} = ${exchangeRate} ${fromCurrency}`;
        rateElement.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
        updateConvertedAmount("cost-first", "cost-second", ".currency-first button.selected", ".currency-second button.selected", ".rate2");
        updateConvertedAmount("cost-first", "cost-second", ".currency-second button.selected", ".currency-first button.selected", ".rate");
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
  }
  
  
  function updateConvertedAmount(fromInputId, toInputId, fromCurrencySelector, toCurrencySelector, rateElementSelector) {
    let amountFrom = document.getElementById(fromInputId).value;
    let toCurrency = document.querySelector(fromCurrencySelector).textContent;
    let fromCurrency = document.querySelector(toCurrencySelector).textContent;
  
  
    let apiKey = 'c174d32b2e9d0faba28bb49f';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let exchangeRate = data.rates[toCurrency];
        let convertedAmount = (isNaN(amountFrom) ? 0 : amountFrom) * exchangeRate;
        let toInputElement = document.getElementById(toInputId);
  
        toInputElement.value = convertedAmount.toFixed(4);
        
if (toInputElement.value == 0.0000) {
  toInputElement.value = ''
}
        
  
        document.querySelector(rateElementSelector).textContent = `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
  }
  
  function updateExchangeRate2() {
    let fromCurrency = document.querySelector(".currency-second button.selected").textContent;
    let toCurrency = document.querySelector(".currency-first button.selected").textContent;
  
    let apiKey = 'c174d32b2e9d0faba28bb49f';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let exchangeRate = data.rates[toCurrency];
        let rateElement = document.querySelector(".rate");
        let rateElement2 = document.querySelector(".rate2");
        rateElement2.textContent = `1 ${toCurrency} = ${exchangeRate} ${fromCurrency}`;
        rateElement.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
        updateConvertedAmount2("cost-second", "cost-first", ".currency-second button.selected", ".currency-first button.selected", ".rate");
        updateConvertedAmount2("cost-second", "cost-first", ".currency-first button.selected", ".currency-second button.selected", ".rate2");
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
  }
  
  
  function updateConvertedAmount2(fromInputId, toInputId, fromCurrencySelector, toCurrencySelector, rateElementSelector) {
    let amountFrom = document.getElementById(fromInputId).value;
    let fromCurrency= document.querySelector(fromCurrencySelector).textContent;
    let toCurrency = document.querySelector(toCurrencySelector).textContent;
  
  
    let apiKey = 'c174d32b2e9d0faba28bb49f';
    let apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let exchangeRate = data.rates[toCurrency];
        let convertedAmount = (isNaN(amountFrom) ? 0 : amountFrom) * exchangeRate;
        let toInputElement = document.getElementById(toInputId);
        
      
        toInputElement.value = convertedAmount.toFixed(4);
        
        
if (toInputElement.value == 0.0000) {
  toInputElement.value = ''
}
        document.querySelector(rateElementSelector).textContent = `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
      })
  
      .catch(error => console.error("Error fetching exchange rates:", error));
  }

