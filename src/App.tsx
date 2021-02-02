import { useState} from "react";
import { useQuery} from "react-query";

// Components

import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"

import Item from './components/Item/Item';

// styles
import { Wrapper } from './App.styles'

// types
import { CartItemType } from "./utils/Types";
import { error } from "console";




const getProducts = async (): Promise<CartItemType[]> => {
  const products = await (await fetch('https://fakestoreapi.com/products')).json();
  return products;
}


const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);

  const handleAddToCart = ( clickedItem: CartItemType) => null;


  if (isLoading) return <LinearProgress />
  if (error) return <div> Something went wrong.....</div>

  
  return (
   <Wrapper>
     <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
       Cart goes here.
     </Drawer>
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
