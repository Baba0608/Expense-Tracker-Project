const container = document.getElementById("container");

const addExpense = document.getElementById("add-expense");

const buyPremium = document.getElementById("buy-premium");

(async function displayExpenses() {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.get("http://localhost:4000/expense", {
      headers: { authorization: token },
    });
    console.log(result);

    result.data.result.forEach((obj) => {
      createExpenseItem(obj);
    });
  } catch (err) {
    console.log(err);
  }
})();

addExpense.addEventListener("click", async (e) => {
  e.preventDefault();

  const item = document.getElementById("item");
  const category = document.getElementById("category");
  const amount = document.getElementById("amount");

  if (item.value != "" && category.value != "" && amount.value != "") {
    const obj = {
      item: item.value,
      category: category.value,
      amount: amount.value,
    };

    try {
      const token = localStorage.getItem("token");
      const result = await axios.post("http://localhost:4000/expense", obj, {
        headers: { authorization: token },
      });

      createExpenseItem(obj);

      item.value = "";
      amount.value = "";
    } catch (err) {
      console.log(err);
    }
  }
});

function createExpenseItem(obj) {
  const expenseListContainer = document.getElementById(
    "expense-list-container"
  );

  const expenseListItem = document.createElement("div");
  expenseListItem.className = "expense-list-item";

  const itemDescription = document.createElement("div");
  itemDescription.className = "item-description";

  const p = document.createElement("p");
  p.textContent = `${obj.item} - ${obj.category} - ${obj.amount}/-`;

  itemDescription.appendChild(p);

  const itemDelete = document.createElement("div");
  itemDelete.className = "item-delete";

  const expenseDeleteBtn = document.createElement("button");
  expenseDeleteBtn.id = "expense-delete";
  expenseDeleteBtn.textContent = "Delete";

  itemDelete.appendChild(expenseDeleteBtn);

  expenseListItem.appendChild(itemDescription);
  expenseListItem.appendChild(itemDelete);

  expenseListContainer.appendChild(expenseListItem);
}

buyPremium.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:4000/purchase/premium", {
      headers: { authorization: token },
    });
    console.log(response);
    const options = {
      key: response.data.key_id,
      order_id: response.data.result.orderid,
      handler: async function (response) {
        await axios.post(
          "http://localhost:4000/purchase/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { authorization: token } }
        );

        alert("You are a Premium user now");
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  } catch (err) {
    console.log(err);
  }
});
