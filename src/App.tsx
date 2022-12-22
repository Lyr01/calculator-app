import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [result, setReuslt] = useState("");
	const [calc, setCalc] = useState("");
	const [overWrite, setOverWrite] = useState(false);
	const [theme, setTheme] = useState("theme-1");

	const operators = ["+", "-", "*", "/", "."];

	const updateCalc = (value: string) => {
		if (
			(operators.includes(value) && calc === "") ||
			(operators.includes(value) && operators.includes(calc.slice(-1))) ||
			(value === "." && calc.includes(".")) ||
			calc.length >= 24
		) {
			return;
		}

		setCalc(calc + value);

		if (!operators.includes(value)) {
			setReuslt(eval(calc + value).toString());
		}

		if (overWrite) {
			if (
				(operators.includes(value) && operators.includes(calc.slice(-1))) ||
				(value === "." && calc.includes("."))
			) {
				return;
			}
			setCalc(calc + value);
			setReuslt(calc + value);
			setOverWrite(false);
		}
	};

	const calculate = () => {
		if (calc === "" || operators.includes(calc.slice(-1))) return;

		setOverWrite(true);
		const evaluation = eval(calc).toString();
		const [integer, float] = evaluation.split(".");
		const formatNumber =
			new Intl.NumberFormat("en").format(Number(integer)) +
			(float ? "." + float : "");
		setCalc(formatNumber);
		setReuslt("");
	};

	const deleteLast = () => {
		if (calc === "") {
			return;
		}

		const value = calc.slice(0, -1);
		setCalc(value);
		setReuslt(value);
	};

	const reset = () => {
		setCalc("");
		setReuslt("");
	};

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
					{result ? <span>({result})</span> : <span>&nbsp;</span>}
					<h1>{calc || 0}</h1>
				</div>
				<div className={`calculator ${theme}-calculator`}>
					<button onClick={() => updateCalc("7")}>7</button>
					<button onClick={() => updateCalc("8")}>8</button>
					<button onClick={() => updateCalc("9")}>9</button>
					<button className={`${theme}-btn-delete`} onClick={deleteLast}>
						del
					</button>
					<button onClick={() => updateCalc("4")}>4</button>
					<button onClick={() => updateCalc("5")}>5</button>
					<button onClick={() => updateCalc("6")}>6</button>
					<button onClick={() => updateCalc("+")}>+</button>
					<button onClick={() => updateCalc("1")}>1</button>
					<button onClick={() => updateCalc("2")}>2</button>
					<button onClick={() => updateCalc("3")}>3</button>
					<button onClick={() => updateCalc("-")}>-</button>
					<button onClick={() => updateCalc(".")}>.</button>
					<button onClick={() => updateCalc("0")}>0</button>
					<button onClick={() => updateCalc("/")}>/</button>
					<button onClick={() => updateCalc("*")}>x</button>
					<button className={`btn-reset ${theme}-btn-reset`} onClick={reset}>
						reset
					</button>
					<button
						className={`btn-equal ${theme}-btn-equal`}
						onClick={calculate}
					>
						=
					</button>
				</div>
			</div>
			{/* <div className="attribution">
				Challenge by{" "}
				<a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
					Frontend Mentor
				</a>
				. Coded by <a href="https://lyr01.github.io/">Hamza Khan</a>.
			</div> */}
		</main>
	);
}

export default App;
