import React, {Component} from "react";
import {Card} from "../../../reusable/card/Card";
import {CardHeader} from "../../../reusable/card/CardHeader";
import {CardBody} from "../../../reusable/card/CardBody";
import {CardFooter} from "../../../reusable/card/CardFooter";

import "./style/login.css";

class UserLoginPage extends Component {

    render() {
        return (
            <form>
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
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label">Password:</label>
                            <div className="col-9">
                                <input id="password"
                                       type="password"
                                       className="form-control"
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="pull-right">
                            <button>Login</button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        );
    }
}

export default UserLoginPage;