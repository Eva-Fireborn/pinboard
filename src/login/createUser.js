import React, { useState } from "react";
import CreateUserVerification from './createUserVerification';
import CreateUserInputForm from './createUserInputForm';

const CreateUser = ({ visibility, updateIsLoggedIn, activateCreateUser }) => {
    let [userInformation, changeUserInformation] = useState({
        name: '',
    });

    let userAuth = <CreateUserVerification activateCreateUser={activateCreateUser} responseGoogle={responseGoogle} responseFacebook={responseFacebook}/>
    let userInputForm = <CreateUserInputForm activateCreateUser={activateCreateUser} userInformation={userInformation} changeUserInformation={changeUserInformation}/>
    
    let updateUserInformation = (information) => {
        changeUserInformation({
            ...userInformation,
            name: information.name,
            email: information.email,
            imgUrl: information.imgUrl,
            totalOfRatings: 0,
            rating: 0,
            memberSince: new Date(),
        })
    }

	if (visibility) {
		return (
            <div id="loginPopup">
                {userInformation.name? userInputForm : userAuth}
            <div className="darkness" onClick={activateCreateUser}></div>
            </div>
			)
	} else {
		return null;
	}

    async function responseGoogle(response) {
        if (response.error) {
            console.log('oh, nooo..');
        } else {
            let res = response.profileObj;
            let info = {
                ...userInformation,
                name: res.name,
                email: res.email,
                imgUrl: res.imageUrl
            }
            updateUserInformation(info)
        }
    }

    async function responseFacebook (response) {
        if (response.error) {
            console.log('oh, nooo..');
        } else {
            let info = {
                ...userInformation,
                name: response.name,
                email: response.email,
                imgUrl: response.picture.data.url
            }
            updateUserInformation(info)
        }
    }
}
export default CreateUser;