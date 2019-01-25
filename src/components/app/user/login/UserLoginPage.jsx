import React, {Component} from "react";
import {Card} from "../../../reusable/card/Card";
import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";

import "./style/login.css";

class UserLoginPage extends Component {

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
        console.log(this.state);
    };

    render() {
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

export default UserLoginPage;