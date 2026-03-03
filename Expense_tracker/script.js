document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('expense-form');
    const nameInput = document.getElementById('expense-name');
    const amountInput = document.getElementById('expense-amount');
    const Submitbtn = document.getElementById('submit');
    const expenseList = document.getElementById('expense-list');
    const totalDisplay = document.getElementById('total');
    const totalAmount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses'))||[];
    // isse array meh data store hoke fir iss data ko ham local storage meh inset karenge 
    let totalAmountValue = calculateTotal();
    renderExpenses(); // yeh waali call nahi maroge toh baar baar value gayab ho jaaynge kuch naa kuch permanent render hona hi cahiye 
    updateTotal();
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        // we need to have a check conditions for further process
        if(name !== "" && !isNaN(amount) && amount >0){
            // now craete objects for each expense we want to add to our array then further into the local storage 
            const newexpense = {
                id : Date.now(),
                name,
                amount
            }
            expenses.push(newexpense);
            savetoLocalStorage();
            // render teh list of expenses
            renderExpenses();
            // need some code to uadte the total amount 
            updateTotal();
            // clear the form feilds after submit so that next form can be filled easily
            nameInput.value = "";
            amountInput.value = "";
        }
    })
    // update the total amount 
    function updateTotal() {
        // get the total amount first then update the total 
        totalAmountValue = calculateTotal(); // same variable ka refene hold kiya hai issi liye joh value yaha hai vahi value vaha bhi hogi 
        // js is synchrounus this time hence it total value in global has 10 as value and here we make  local totalAmanount = 20 them they are both same variable refence so the new value to both is 20 that just simple coding concept 
        totalAmount.textContent = totalAmountValue.toFixed(2);
    }
    function savetoLocalStorage() {
        localStorage.setItem('expenses',JSON.stringify(expenses));
    }
    function calculateTotal() {
        // with this reduce method you can easily calculate the overall sum of the amaount
        return expenses.reduce((sum , curr)=> sum + curr.amount ,0)
    }

    function renderExpenses() {
        expenseList.innerHTML ="";
        // har ak expnses meh jao usse uski value nikalo ak element banao or usko value daal ke append kar doh 
        expenses.forEach(expense =>{
            const li = document.createElement('li');
            li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)}
            <button data-id=${expense.id}>Delete</button>`;
            expenseList.appendChild(li);
        })
    }

    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== id);
            savetoLocalStorage();
            renderExpenses();
            updateTotal();
        }
    })
})