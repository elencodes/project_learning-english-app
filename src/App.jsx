import { Header } from "./components/Header/Header";
import { Table } from "./components/Table/Table";
import "./App.scss";

function App() {
	return (
		<>
			<div className="app">
				<Header />
				<Table />
			</div>
		</>
	);
}

export default App;
