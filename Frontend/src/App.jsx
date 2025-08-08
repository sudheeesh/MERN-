import {BrowserRouter as  Router,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Itemlist from './components/Itemlist'
import { Provider } from 'react-redux'
import appstore from './utils/appStore'
import Header from './components/Header'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import ShippingAddress from './components/Shipping'
import Payment from './pages/Payment'
import Register from './userdetails/Register'
import OrderSummary from './components/OrderSummary'
import MyOrders from './userdetails/MyOrders'
import SearchResultsPage from './pages/SearchResultPage'

function App() {

  return (
    <Provider store={appstore}>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<Itemlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/shipping' element={<ShippingAddress/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/order-summary' element={<OrderSummary/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/search/:keyword' element={<SearchResultsPage/>}/>
      </Routes>
      <Footer/>
    </Router>
   </Provider>
  )

}
 

export default App
