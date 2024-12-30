
import './App.css';
//import Axios from "axios";
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_men.jpeg';
import women_banner from './Components/Assets/banner_women.jpeg';
import kid_banner from './Components/Assets/banner_kids.jpeg';
//import ShopContextProvider from './Context/ShopContext';

function App() {
  // const [data, setData] = useState();

  // const getData=async() =>{
  //   const res = await Axios.get("http://localhost:4002/getData");
  //   setData(res.data);
  // }
  // useEffect(()=>{
  //   getData()
  // }, []);

  return (
    <BrowserRouter>
    {/* <div>{data}</div> */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter> 
  );
}


export default App;
