import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(localStorage.getItem('cart') ?
		JSON.parse(localStorage.getItem('cart'))
		: []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addItem = item => {
		setCart([...cart, item]);
		console.log(cart);
	};

	const removeItem = id => {
		const newCart = cart.filter(item => item.id !== id);
		setCart(newCart);
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem }}>
				<div className="App">
					<Navigation />
					{/* Routes */}
					<Route exact path="/" component={Products} />
					<Route exact path="/cart" component={ShoppingCart} />
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
