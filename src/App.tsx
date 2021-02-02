import { useState} from "react";
import { useQuery} from "react-query";

// Components
import Cart from "./components/Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge" 

import Item from './components/Item/Item';

// styles
import { Wrapper, StyledButton } from './App.styles'

// types
import { CartItemType } from "./utils/Types";




const getProducts = async (): Promise<CartItemType[]> => {
  const products = await (await fetch('https://fakestoreapi.com/products')).json();
  return products;
}


const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);

  const handleAddToCart = ( clickedItem: CartItemType) => {
    setCartItems(prevState => {
       const isItemInCart = prevState.find(item => item.id === clickedItem.id);
       if(isItemInCart) {
         return prevState.map(item => (
           item.id === clickedItem.id ? {...item, quantity: item.quantity + 1} : item
         ))
       }else {
         return [...prevState, {...clickedItem, quantity: 1}]
       }
    })
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevState) => {
      return prevState.reduce((accumulator, item) => {
        if(item.id === id) {
          // if the item quantity is 0, by returning the accumulator
          // the item with quantity 0 is removed from the array i.e. cart
          if(item.quantity === 0) return accumulator;
          return [...accumulator, {...item, quantity: item.quantity - 1}]
        }else {
          return [...accumulator, item];
        }
      }, [] as CartItemType[])
    })
  };
  const getTotalItems = (items : CartItemType[]) => (
    items.reduce((sum: number, item) => sum + item.quantity, 0)
  )
  

  if (isLoading) return <LinearProgress />
  if (error) return <div> Something went wrong.....</div>

  
  return (
   <Wrapper>
     <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
       <Cart  
       cartItems={cartItems} 
       addToCart={handleAddToCart}
       removeFromCart={handleRemoveFromCart}
       />
     </Drawer>
     <StyledButton onClick={() => setCartOpen(true)}>
       <Badge badgeContent={getTotalItems(cartItems)} color="error">
         <AddShoppingCart />
       </Badge>
     </StyledButton>
     <Grid container spacing={3}>
       {
         data?.map(item => (
           <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
           </Grid>
         ))
       }
     </Grid>
   </Wrapper>
  );
}

export default App;
