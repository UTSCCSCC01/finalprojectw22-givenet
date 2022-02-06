async function test() {
	await fetch("/test", { method: "POST" });
}

async function fetchDonorData() {
	var accID = (document.getElementById("AccID") as HTMLInputElement).value;

	console.log(accID);
	// await fetch("/test", { method: "POST" });
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<button onClick={test}>Test</button> 
			</header> <br />
			<hr />
			<label htmlFor="AccID">AccID: </label>
			<input type="text" name="AccID" id="AccID" ></input> <br /> <br />
			<button onClick={fetchDonorData}>Populate Data</button> <br /><br />
			<hr />
			<form>
				<label htmlFor="Name">Name: </label>
				<input type="text" name="Name"></input> <br /><br />
				
				<label htmlFor="Location">Location: </label>
				<input type="text" name="Location"></input> <br /><br />

				<label htmlFor="HoO">HoO: </label>
				<input type="text" name="HoO"></input> <br /><br />

				<label htmlFor="Phone">Phone: </label>
				<input type="text" name="Phone"></input> <br /><br />

				<label htmlFor="Email">Email: </label>
				<input type="email" name="Email"></input> <br /><br />

				<label htmlFor="Description">Description: </label>
				<input type="text" name="Description"></input> <br /><br />

				<input type="submit" name="UpdateData" value="Submit Changes" />
			</form>
		</div>
	);
}

export default App;
