import React, { useState } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReviewAd from './ReviewAd';
import ErrorMsg from './ErrorMsg';


const CreateAdd = ({ isLoggedIn }) => {
	const [visibility, setVisibility] = useState(false);
	const [valid, setIsValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	let categories = [{ id: 1, name: 'Sökes' }, { id: 2, name: 'Finnes' }];

	async function sendNewAd(fields) {
		const serverResponse = await fetch('http://localhost:4000/ApiPostNewAd', {
			method: 'POST',
			body: JSON.stringify(fields, null, 4),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
		const res = await serverResponse.json();
		console.log('Ad created successfuly! Response status: ', res.status);
	}

	const UserInformation = (isValid) => {
		setIsValid(false);
		if (!isLoggedIn && !isValid) {
			setIsValid(true);
			setErrorMessage('You have to log in first and fill in the required fields')
		} else if (isValid && !isLoggedIn) {
			setIsValid(true);
			setErrorMessage('You have to log in first');
		} else if (isLoggedIn && !isValid) {
			setIsValid(true);
			setErrorMessage('You have to fill in the required fields')
		} else if (isValid && isLoggedIn) {
			setErrorMessage('');
		}
	}

    return (
        <div id="wrapper">
            <main className="formContainer">
                <h3 className="rubrik">Skapa annons</h3>
                <Formik 
                    initialValues={{
                        addType: '',
                        header: '',
                        category: '',
                        description: '',
                        specialRequirements: '',
                        city: '',
                        street: '',
                        zip: '',
                        price: '',
                        userId: isLoggedIn ? isLoggedIn._id : null
                    }}
                    validationSchema={Yup.object().shape({
                        addType: Yup.array()
                            .required('Välj typ av annons'),
                        header: Yup.string()
                            .required('Skriv en rubrik'),
                        category: Yup.string()
                            .required('Välj en kategori'),
                        description: Yup.string()
                            .min(20, 'Annonstext måste vara åtminstone 20 tecken lång')
                            .required('Skriv en annonstext'),
                        city:  Yup.string()
                            .required('Skriv en stad'),
                        zip: Yup.string()
                            .matches(/^[0-9]{5}$/, 'Postnumret måste vara 5 tecken lång')
                            .required('Skriv ett postnummer'),
                        price: Yup.number()
                            .positive('Pris måste vara högre än 0')
                            .required('Skriv ett pris')
                    })}
                    onSubmit={fields => {
                        if (isLoggedIn) {
                            sendNewAd(fields);
                        } else {
                            console.log('trying to submit without login in');
                        }
                        //alert('SUCCESS!! \n\n' + JSON.stringify(fields, null, 4))
                    }}
                    render={({ errors, touched, values, isValid }) => (
                        <Form>
                            <div>
                            <label htmlFor="type">Annons typ*</label>
                            <FieldArray
                                name="addType"
                                render={arrayHelpers => (
                                <div className={'checkboxes' + (typeof errors.addType === 'string' ? ' is-invalid' : '')}>
                                    {categories.map(category => (
                                        <div key={category.id} className="checkbox">
                                            <label>
                                            {category.name}
                                                <input
                                                    name="addType"
                                                    type="checkbox"
                                                    value={category.name}
                                                    checked={values.addType.includes(category.name)}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            arrayHelpers.push(category.name);
                                                        } else {
                                                            const idx = values.addType.indexOf(category.name);
                                                            arrayHelpers.remove(idx);
                                                        }
                                                    }}
                                                />{" "}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                )}
                            />
                            <div>
                                { typeof errors.addType === 'string' ? <ErrorMessage name="addType" component="div" className="invalid-feedback" /> : null} 
                            </div>
                            </div>

							<div className="form-group">
								<label htmlFor="header">Rubrik*</label>
								<Field name="header" type="text" className={'form-control' + (errors.header && touched.header ? ' is-invalid' : '')} />
								<ErrorMessage name="header" component="div" className="invalid-feedback" />
							</div>
							<div className="form-group">
								<label htmlFor="category">Kategori*</label>
								<Field component="select" name="category" type="select" className={'form-control select' + (errors.category && touched.category ? ' is-invalid' : '')}>
									<option value=""></option>
									<option value="musik">musik</option>
									<option value="mat">mat</option>
									<option value="transport">transport</option>
									<option value="hem">hem</option>
									<option value="städning">städning</option>
								</Field>
								<ErrorMessage name="category" component="div" className="invalid-feedback" />
							</div>
							<div className="form-group">
								<label htmlFor="description">Beskrivning*</label>
								<Field component="textarea" name="description" type="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
								<ErrorMessage name="description" component="div" className="invalid-feedback" />
							</div>
							<div className="form-group">
								<label htmlFor="specialRequirements">Särskild önskemål</label>
								<Field name="specialRequirements" type="text" />
							</div>
							<div className="form-group">
								<label htmlFor="city">Stad*</label>
								<Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
								<ErrorMessage name="city" component="div" className="invalid-feedback" />
							</div>
							<div className="form-group">
								<label htmlFor="street">Gatuadress</label>
								<Field name="street" type="text" />
							</div>
							<div className="shortInputs">
								<div className="form-group shortInput">
									<label htmlFor="zip">Postnummer*</label>
									<Field name="zip" type="text" className={'form-control' + (errors.zip && touched.zip ? ' is-invalid' : '')} />
									<ErrorMessage name="zip" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group shortInput">
									<label htmlFor="price">Pris* (kr)</label>
									<Field name="price" type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
									<ErrorMessage name="price" component="div" className="invalid-feedback" />
								</div>
							</div>
							<div>*obligatorisk</div>
							<div className="form-group">
								<button type="submit" className="formButton" onClick={() => UserInformation(isValid)}>Publicera</button>
								<button type="reset" className="resetButton" onClick={() => setIsValid(false)}>Återställ</button>
								<button type="button" onClick={() => setVisibility(!visibility)}>Förhandsgranska annons</button>
							</div>
							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
							{visibility ? <ReviewAd values={JSON.stringify(values)} onClose={() => setVisibility(!visibility)} /> : null}
						</Form>
					)}
				/>
				{valid ? <ErrorMsg>{errorMessage}</ErrorMsg> : null}
			</main>
		</div>
	);
};

export default CreateAdd;