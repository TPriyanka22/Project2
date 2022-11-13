import React, { PureComponent, Fragment } from 'react'
import AdminView from './AdminView/AdminView';
import UserView from './UserView/UserView';
import cognitoUtils from '../Utilities/CognitoDetails'

class RedirectPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isUserAdmin: undefined,
            userName: "",
            userEmail: ""
        }
    }
    componentDidMount() {
        this.props.userHasLoggedIn(true);
        console.log("hello");
        var curUrl = window.location.href;
        console.log(curUrl);
        cognitoUtils.parseCognitoWebResponse(curUrl).then((result) => {
            console.log("web response ::",result); // "Stuff worked!"
            cognitoUtils.getCognitoSession().then((result) => {
                console.log("set1", result.user.email);
                sessionStorage.setItem("userEmail", result.user.email)
                sessionStorage.setItem("userName", result.user.userName)
                this.setState({
                    userName: result.user.userName,
                    userEmail: result.user.email
                }, function () {
                    //this.getFilesData();
                })
                const grp = result.user.groups;
                if (grp) {
                    if (grp.includes("AdminGroup")) {
                        this.setState({
                            isUserAdmin: true
                        })
                    } else {
                        this.setState({
                            isUserAdmin: false
                        }) 
                    }
                } else {
                    this.setState({
                        isUserAdmin: false
                    }) 
                }
            });
        }, function (err) {
            console.log("error",err);
        });
    }

    render() {
        const {isUserAdmin} = this.state
        return (
            <Fragment>
                {
                    isUserAdmin == true &&
                    <AdminView />
                }
               

            </Fragment>
        )
    }
}

export default RedirectPage
