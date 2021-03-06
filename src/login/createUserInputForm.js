import React from 'react';
//import logo from './../img/pinboard.png';

import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const CreateUserInputForm = ({activateCreateUser, userInformation, changeUserInformation, updateIsLoggedIn}) => {

      async function connectNewUser (value) {
        const serverResponse = await fetch('http://localhost:4000/ApiLogInNewUser', {
            method: 'POST',
            body: JSON.stringify(value, null, 4),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const res = await serverResponse.json();

        updateIsLoggedIn({
            _id: res.body.res,
            name: userInformation.name
        })
        let user = {
            _id: res.body.res,
            name: userInformation.name
        }
        activateCreateUser();
        localStorage.setItem('user', JSON.stringify(user));
    }
    return (
        <div id="createUserWindow">
            <button className="close" onClick={activateCreateUser}>X</button>
            <Formik
                    initialValues={{
                        name: userInformation.name,
                        email: userInformation.email,
                        imgUrl: userInformation.imgUrl,
                        totalOfRatings: 0,
                        rating: 0,
                        address: '',
                        postalcode: '',
                        city: '',
                        phone: '',
                        description: ''
                    }}
                    validationSchema={Yup.object().shape({
                        address: Yup.string()
                            .required('Skriv din adress'),
                        postalcode: Yup.string()
                            .matches(/^[0-9]{5}$/, 'Postnumret måste vara 5 tecken lång')
                            .required('Skriv ett postnummer'),
                        city: Yup.string()
                            .required('Skriv en stad'),
                        phone: Yup.number()
                            .required('Skriv telefone number'),
                        description: Yup.string()
                            .min(20, 'Beskrivning måste vara åtminstone 20 tecken lång')
                            .required('Beskriv dig själv')
                    })}
                    onSubmit={fields => {
                        connectNewUser(fields);
                    }}
                    render={({ errors, touched, values}) => (
                        <Form>
                            <div>
                                <label htmlFor="address">Adress*</label>
                                <Field name="address" type="text" className={errors.address && touched.address ? ' is-invalid' : ''} />
                                <ErrorMessage name="address" component="div" className="invalid-feedback" />
                            </div>
                            <div>
                                <label htmlFor="postalcode">Postnummer*</label>
                                <Field name="postalcode" type="text" className={errors.postalcode && touched.postalcode ? ' is-invalid' : ''} />
                                <ErrorMessage name="postalcode" component="div" className="invalid-feedback" />
                            </div>
                            <div>
                                <label htmlFor="city">Stad*</label>
                                <Field name="city" type="text" className={errors.city && touched.city ? ' is-invalid' : ''} />
                                <ErrorMessage name="city" component="div" className="invalid-feedback" />
                            </div>
                            <div>
                                <label htmlFor="phone">Telefon*</label>
                                <Field name="phone" type="text" className={errors.phone && touched.phone ? ' is-invalid' : ''} />
                                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                            </div>
                            <div>
                                <label htmlFor="description">Beskrivning om dig*</label>
                                <Field component="textarea" name="description" type="textarea" className={errors.description && touched.description ? ' is-invalid' : ''} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            <div>*obligatorisk</div>
                            <div>
                                <button type="submit" className="submitButtonInLoggin" onClick={()=>{console.log('verifiering?')}}>Skapa konto</button>
                            </div>
                        </Form>
                    )}
                />
        </div>
    )

}
export default CreateUserInputForm;
