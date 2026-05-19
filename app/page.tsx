"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string>("");
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  // ✅ Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if ((/[0-9+\-*/.]/).test(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        calculateResult();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clearInput();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`rounded-2xl shadow-xl p-6 w-80 transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🧮 Calculator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded-lg"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <input
          type="text"
          value={input}
          readOnly
          className={`w-full text-right p-3 border rounded-lg text-lg ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-50 border-gray-300"
          }`}
          placeholder="0"
        />

        <div className="mt-2 mb-4 text-right text-xl h-8">
          {result !== "" && <p>= {result}</p>}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  item === "=" ? calculateResult() : handleClick(item)
                }
                className={`p-3 text-lg rounded-lg transition-colors ${
                  item === "="
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {item}
              </button>
            ))}
          <button
            onClick={clearInput}
            className="col-span-4 p-3 bg-red-500 text-white rounded-lg mt-2 hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
