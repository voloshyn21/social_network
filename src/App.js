import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
//import DialogsContainer from './components/Dialogs/DialogContainer';
//import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer2';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import {initiolizeApp} from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import {withSuspense} from './hoc/withSuspense';

//with simple LazyLoading
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogContainer'));
//with SuspenseHOC
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
alert("error");
    };
    componentDidMount() {
        this.props.initiolizeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    };
    componentWillUnmount() {
        this.props.initiolizeApp();
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
        }
        return (

            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-main">
                    <Switch>
                        <Route exact path='/'
                               render={() =>
                                   <Redirect to={"/profile"}/>
                               }/>
                        <Route path='/profile/:userId?'
                               render={() =>
                                   <ProfileContainer/>
                               }/>
                        {/*<Route path='/profile/:userId?'*/}
                        {/*       render={withSuspense(ProfileContainer)}/>*/}
                        <Route path='/messages'
                               render={() => {
                                   return <React.Suspense fallback={<div>Loading ...</div>}>
                                       <DialogsContainer/>
                                   </React.Suspense>
                               }}/>
                        {/*<Route path='/users'*/}
                        {/*       render={() =>*/}
                        {/*           <UsersContainer pageTitle={"smth"}/>*/}
                        {/*       }/>*/}
                        <Route path='/users'
                               render={withSuspense(UsersContainer)}
                        />
                        <Route path='/login'
                               render={() =>
                                   <Login/>
                               }/>
                        <Route path='*'
                               render={() =>
                                   <div>404 PAGE IS NOT FOUND</div>
                               }/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer = compose(withRouter,
    connect(mapStateToProps, {initiolizeApp}))(App);

const MainApp = () => {
    return (
        // <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
// </React.StrictMode>
    )
};

export default MainApp;

