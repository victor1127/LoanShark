function CalculateLoan(){
    
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;

    let monthlyPayment = document.getElementById("monthlyPayment");
    let totalPrincipal = document.getElementById("totalPrincipal");
    let totalInterest = document.getElementById("totalInterest");
    let totalCost = document.getElementById("totalCost");

    let payment = (loanAmount) * (rate/1200) / (1-(Math.pow(1+rate/1200, -term)));
    let interest = (payment * term) - loanAmount;
    let cost = (payment * term) + loanAmount;


    monthlyPayment.textContent = ConvertToCurrency(payment.toFixed(2));    
    totalPrincipal.textContent = ConvertToCurrency(loanAmount);
    totalInterest.textContent = ConvertToCurrency(interest.toFixed(2));
    totalCost.textContent = ConvertToCurrency(cost);

    PopulateTable(payment, loanAmount, rate, term);

}


function PopulateTable(monthlyPayment, loanAmount, rate, term){

    let month = 1;
    let payment = monthlyPayment
    let remainingBalance = loanAmount;
    let interestPayment = remainingBalance * rate / 1200;
    let totalInterest = interestPayment;
    let principal = payment - interestPayment;

    let tableBody = document.getElementById("loanTable");
    let templateRow = document.getElementById("InnerTableTemplate");
    tableBody.innerHTML ="";

    while(month <= term){

        let tableRow = document.importNode(templateRow.content, true);       
        let rowCols = tableRow.querySelectorAll("td");
        
        rowCols[0].textContent = month;
        rowCols[1].textContent = ConvertToCurrency(payment.toFixed(2));;
        rowCols[2].textContent = ConvertToCurrency(principal.toFixed(2));
        rowCols[3].textContent = ConvertToCurrency(interestPayment.toFixed(2));
        rowCols[4].textContent = ConvertToCurrency(totalInterest.toFixed(2));
        rowCols[5].textContent = ConvertToCurrency(remainingBalance);

        tableBody.appendChild(tableRow);

        interestPayment = remainingBalance * rate / 1200;
        totalInterest += interestPayment
        principal = payment -interestPayment;
        remainingBalance -= principal
        month++;
    }
}

function ConvertToCurrency(price){
    let currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let output = currencyFormatter.format(price);
    return output;
}
