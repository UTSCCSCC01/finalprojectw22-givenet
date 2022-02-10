import './pp_styles.css'

async function test() {
	await fetch("/test", { method: "POST" });
}

function App() {
	return (
		<div>
			<header className="App-header">
				<button onClick={test}>Test</button>
			</header>
		</div>
	);
}

export default App;
