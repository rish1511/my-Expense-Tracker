import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("please fill the fields");
      return;
    }

    const newExpenses = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date,
      category,
    };

    const updatedExpenses = [...expenses, newExpenses];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  const handleDelete = (id) => {
    const updated = expenses.filter((exp) => exp.id !== id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  return (
    <>
      <div className="h-[100vh]">
        <div className=" text-l md:text-xl font-mono h-[4.5vh] font-bold text-center text-green-700">
          Total Expense: ₹{totalExpense}
        </div>

        <div className="h-auto md:h-[90vh] font-serif bg-amber-200 flex flex-col md:flex-row gap-10 md:gap-[100px] justify-items-start px-4 md:pl-10 py-4 md:items-center">
          <form
            onSubmit={handleClick}
            className="w-full md:w-[400px] bg-white py-5 rounded-2xl flex flex-col gap-10 items-center"
          >
            <h2 className="text-cyan-900 font-extrabold text-2xl">
              Create Card:
            </h2>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                value={title}
                placeholder="Write Your Title"
                onChange={(e) => setTitle(e.target.value)}
                className="border w-[85vw] md:w-[350px] rounded pl-3"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Write Your Amount"
                className="border w-[85vw] md:w-[350px] rounded pl-3"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border w-[85vw] md:w-[350px] rounded pl-3 pr-3"
              />
              <input
                type="text"
                value={category}
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
                className="border w-[85vw] md:w-[350px] rounded pl-3"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-900 text-white py-1 font-extrabold border px-4 rounded-2xl"
            >
              Add Expense
            </button>
          </form>

          <div className="scroll-container flex flex-wrap justify-center md:justify-start w-full md:w-[60vw] max-h-[75vh] overflow-y-auto pr-4">
            {expenses.length === 0 ? (
              <p>No Expenses added yet.</p>
            ) : (
              expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white w-[85vw] md:w-[200px] rounded shadow p-4 m-4"
                >
                  <h2 className="font-bold">{exp.title}</h2>
                  <p>₹{exp.amount}</p>
                  <p>{exp.category}</p>
                  <p>{exp.date}</p>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-black font-mono w-full md:h-[5vh] font-bold text-white text-center">
          Created by Rishabh Sharma : 2025 June,
          <span className="text-blue-400 font-light text-[15px] md:text-xl">
            {" "}
            Copyright is possible
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
