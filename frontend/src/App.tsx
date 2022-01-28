async function test() {
	await fetch("/test", { method: "POST" });
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<button onClick={test}>Test</button>
			</header>
		</div>
	);
}

export default App;
