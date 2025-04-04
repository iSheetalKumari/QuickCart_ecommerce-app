import { WishlistProvider } from './src/context/WishlistContext';
import { CartProvider } from './src/context/CartContext'; // Check if this exists
import AppNavigator from './src/navigation/AppNavigator'; // Check if this exists

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </WishlistProvider>
  );
}
