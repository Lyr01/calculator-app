import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [theme, setTheme] = useState("theme-1");
	const [result, setResult] = useState<string>("");
	const [number, setNumber] = useState<string>("");
	const [prevFullNumber, setPrevFullNumber] = useState<string>("");
	const [operator, setOperator] = useState<string>("");

	const updateDigit = (num: string) => {
		if (number.includes(".") && num === ".") return;
		let completeNum = number + "" + num;
		setNumber(completeNum);
	};

	const updateOperator = (op: string) => {
		if (number === "" && result === "" && prevFullNumber === "") return;
		calculate();
		setOperator(op);
		setPrevFullNumber(number);
		setNumber("");
	};

	const calculate = () => {
		if (result === "") {
			operator === "+"
				? setResult((Number(prevFullNumber) + Number(number)).toString())
				: null;

			operator === "-"
				? setResult((Number(prevFullNumber) - Number(number)).toString())
				: null;
			operator === "*"
				? setResult(
						(Number(prevFullNumber) * Number(number ? number : 1)).toString()
				  )
				: null;
			operator === "/"
				? setResult(
						(Number(prevFullNumber) / Number(number ? number : 1)).toString()
				  )
				: null;
		} else {
			operator === "+"
				? setResult((Number(result) + Number(number)).toString())
				: null;
			operator === "-"
				? setResult((Number(result) - Number(number)).toString())
				: null;
			operator === "*"
				? setResult((Number(result) * Number(number ? number : 1)).toString())
				: null;
			operator === "/"
				? setResult((Number(result) / Number(number ? number : 1)).toString())
				: null;
		}
	};

	const equal = () => {
		setNumber("");
		calculate();
	};

	const reset = () => {
		setNumber("");
		setResult("");
		setOperator("");
		setPrevFullNumber("");
	};

	const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
		maximumFractionDigits: 0,
	});
	function formatOperand(operand: string) {
		if (operand == null) return;
		const [integer, decimal] = operand.split(".");
		if (decimal == null) return INTEGER_FORMATTER.format(Number(integer));
		return `${INTEGER_FORMATTER.format(Number(integer))}.${Number(decimal)}`;
	}

	return (
		<main className={`App ${theme}-App`}>
			<div className="container">
				<div className={`calc-header ${theme}-calc-header`}>
					<span className="header-title">calc</span>
					<div className="theme-selector">
						<small className="theme-text">theme</small>
						<div className="theme-options">
							<div className="theme-labels">
								<label onClick={() => setTheme("theme-1")}>1</label>
								<label onClick={() => setTheme("theme-2")}>2</label>
								<label onClick={() => setTheme("theme-3")}>3</label>
							</div>
							<div className={`theme-switchs ${theme}-theme-switchs`}>
								<div
									style={{
										backgroundColor:
											theme === "theme-1" ? "hsl(6, 63%, 50%)" : "",
									}}
									onClick={() => setTheme("theme-1")}
								></div>
								<div
									style={{
										backgroundColor:
											theme === "theme-2" ? "hsl(25, 98%, 40%)" : "",
									}}
									onClick={() => setTheme("theme-2")}
								></div>
								<div
									style={{
										backgroundColor:
											theme === "theme-3" ? "hsl(176, 100%, 44%)" : "",
									}}
									onClick={() => setTheme("theme-3")}
								></div>
							</div>
						</div>
					</div>
				</div>
				<div className={`display-container ${theme}-display-container`}>
					<small>
						{result
							? formatOperand(result) + "" + operator
							: formatOperand(prevFullNumber) + "" + operator || "0"}
					</small>
					<h1>{number ? formatOperand(number) : formatOperand(result) || 0}</h1>
				</div>
				<div className={`calculator ${theme}-calculator`}>
					<button onClick={() => updateDigit("7")}>7</button>
					<button onClick={() => updateDigit("8")}>8</button>
					<button onClick={() => updateDigit("9")}>9</button>
					<button
						className={`${theme}-btn-delete`}
						onClick={() => setNumber(number.slice(0, -1))}
					>
						del
					</button>
					<button onClick={() => updateDigit("4")}>4</button>
					<button onClick={() => updateDigit("5")}>5</button>
					<button onClick={() => updateDigit("6")}>6</button>
					<button onClick={() => updateOperator("+")}>+</button>
					<button onClick={() => updateDigit("1")}>1</button>
					<button onClick={() => updateDigit("2")}>2</button>
					<button onClick={() => updateDigit("3")}>3</button>
					<button onClick={() => updateOperator("-")}>-</button>
					<button onClick={() => updateDigit(".")}>.</button>
					<button onClick={() => updateDigit("0")}>0</button>
					<button onClick={() => updateOperator("/")}>/</button>
					<button onClick={() => updateOperator("*")}>x</button>
					<button className={`btn-reset ${theme}-btn-reset`} onClick={reset}>
						reset
					</button>
					<button className={`btn-equal ${theme}-btn-equal`} onClick={equal}>
						=
					</button>
				</div>
			</div>
			<div className="attribution">
				Challenge by{" "}
				<a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
					Frontend Mentor
				</a>
				. Coded by <a href="https://lyr01.github.io/">Hamza Khan</a>.
			</div>
		</main>
	);
}

export default App;
