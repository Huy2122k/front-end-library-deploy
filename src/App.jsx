// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Result } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.less';
import Home from './components/Home';
import RegistrationForm from './components/register/RegisterUser';

import ProvideAuth from './auth/ProvideAuth';
import RequireAuth from './auth/RequireAuth';
import BoardAdmin from './components/BoardAdmin';
import BoardUser from './components/BoardUser';
import BookDetail from './components/book/detail/BookDetail';
import ListBook from './components/book/ListBook';
import ProvideBorrowList from './components/contexts/BorrowListProvider';
import ProvideWishList from './components/contexts/WishListProvider';

import AboutPage from './components/about/AboutPage';
import CreateBook from './components/admin/book/CreateBook';
import ListUser from './components/admin/user/ListUser';
import BorrowList from './components/borrow/borrow-list';
import LayoutCustom from './components/layout';
import Login from './components/login/Login';
import Account from './components/user/Account';
import ProfileEdit from './components/user/edit/ProfileEdit';
import Profile from './components/user/Profile';
const App = () => {
    const navigate = useNavigate();
    return (
        <ProvideAuth>
            <ProvideWishList>
                <ProvideBorrowList>
                    <Routes>
                        <Route element={<LayoutCustom />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<RegistrationForm />} />
                            <Route path="/books" element={<ListBook />} />
                            <Route path="/books/:id" element={<BookDetail />} />
                            <Route path="/profile/:id" element={<Account />} />
                            <Route element={<RequireAuth role={['USER']} />}>
                                <Route path="/user" element={<BoardUser />} />
                                <Route path="/borrow" element={<BorrowList />} />
                            </Route>
                            <Route element={<RequireAuth role={['ADMIN']} />}>
                                <Route path="/admin" element={<BoardAdmin />} />
                                <Route path="/create-book" element={<CreateBook />} />
                                <Route path="/users-manage" element={<ListUser />} />
                            </Route>
                            <Route element={<RequireAuth role={['USER', 'ADMIN']} />}>
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/profile/edit/:id" element={<ProfileEdit />} />
                            </Route>
                            <Route
                                path="*"
                                element={
                                    <Result
                                        status="404"
                                        title="404"
                                        subTitle="Sorry, the page you visited does not exist."
                                        extra={
                                            <Button type="primary" onClick={() => navigate('/')}>
                                                Back to Home
                                            </Button>
                                        }
                                    />
                                }
                            />
                        </Route>
                    </Routes>
                </ProvideBorrowList>
            </ProvideWishList>
        </ProvideAuth>
    );
};

export default App;
