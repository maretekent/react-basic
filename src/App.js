import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from "./pages/About";
import NotFound from "./pages/NotFound";


const App = () => (
	<Router>
		<Routes>
		<Route path="/"  element={
			<Layout>
				<Home />
			</Layout>
		} />
		<Route
			path="/about"
			element={
				<Layout>
					<About />
				</Layout>
			}
		/>
		<Route
			path="/contact"
			element={
				<Layout>
					<Contact />
				</Layout>
			}
		/>
		<Route path="*" element={
			<Layout>
				<NotFound />
			</Layout>
		} />
		</Routes>
	</Router>
);

export default App;
