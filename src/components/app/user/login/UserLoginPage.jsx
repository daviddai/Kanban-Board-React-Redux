import React, {Component} from "react";

import PropTypes from "prop-types";

import {Card} from "../../../reusable/card/Card";
import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";

import "./style/login.css";
import {connect} from "react-redux";
import {authenticateUser} from "../../../../actions/user/UserAction";
import {Redirect} from "react-router";

const mapStateToProps = state => {
    console.log("======");
    console.log(state);

    return {
        isAuthenticated: state.userReducer.isAuthenticated,
        redirectTo: state.appMenuReducer.currentMenuItem === undefined ? '/dashboard' : state.appMenuReducer.currentMenuItem.uri
    }
};

class ConnectedUserLoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                email: null,
                password: null
            }
        };
    }

    updateEmail = (event) => {
        this.setState({loginForm: {...this.state.loginForm, email: event.target.value}});
    };

    updatePassword = (event) => {
        this.setState({loginForm: {...this.state.loginForm, password: event.target.value}});
    };

    login = (event) => {
        event.preventDefault();
        this.props.authenticateUser(this.state.loginForm);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={this.props.redirectTo} />;
        }

        return (
            <form onSubmit={this.login}>
                <Card className="login-card mx-auto">
                    <CardHeader>
                        <h3 className="text-center">
                            User Login
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Email:</label>
                            <div className="col-9">
                                <input id="email"
                                       type="text"
                                       className="form-control"
                                       onChange={this.updateEmail}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Password:</label>
                            <div className="col-9">
                                <input id="password"
                                       type="password"
                                       className="form-control"
                                       onChange={this.updatePassword}
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="pull-right">
                            <input type="submit"
                                   value="Login"
                            />
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }
}

ConnectedUserLoginPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    redirectTo: PropTypes.string.isRequired
};

const UserLoginPage = connect(mapStateToProps, {authenticateUser})(ConnectedUserLoginPage);

export default UserLoginPage;