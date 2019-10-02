import React, { useState, useEffect } from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReviewAd from './ReviewAd';
import ErrorMsg from './ErrorMsg';
import GreenMessage from './GreenMessage';


const CreateAdd = ({ isLoggedIn }) => {
	const [visibility, setVisibility] = useState(false);
	const [valid, setIsValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [userID, setUserID] = useState(null);
	const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
			setUserID(isLoggedIn._id);
		} else {
			setUserID(null)
		}
    }, [isLoggedIn]);

	let categories = [{ id: 1, name: 'Söker' }, { id: 2, name: 'Säljer' }];

	async function sendNewAd(fields) {
        let ad = {...fields, userId: userID};
		const serverResponse = await fetch('http://localhost:4000/ApiPostNewAd', {
			method: 'POST',
			body: JSON.stringify(ad),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
		const res = await serverResponse.json();
		console.log('Ad created successfuly! Response status: ', res.status);
		if (res.status === 200) {
			setMessageSent(true);
			setTimeout(() => setMessageSent(false), 2000);
		}
	}

	const UserInformation = (isValid) => {
		setIsValid(false);
		if (!isLoggedIn && !isValid) {
			setIsValid(true);
			setErrorMessage('Du måste logga in för att publicera en annons och alla obligatoriska fälten måste vara fyllt i')
		} else if (isValid && !isLoggedIn) {
			setIsValid(true);
			setErrorMessage('Du måste logga in för att publicera en annons');
		} else if (isLoggedIn && !isValid) {
			setIsValid(true);
			setErrorMessage('Du måste fylla i alla obligatoriska fälten')
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
                        price: ''
                    }}
                    validationSchema={Yup.object().shape({
                        addType: Yup.array()
                            .required('Välj typ av annons'),
                        header: Yup.string()
							.required('Skriv en rubrik')
							.max(80, 'Rubrik kan inte vara längre än 80 tecken lång'),
                        category: Yup.string()
                            .required('Välj en kategori'),
                        description: Yup.string()
                            .min(20, 'Annonstext måste vara åtminstone 20 tecken lång')
                            .required('Skriv en annonstext'),
                        city: Yup.string()
                            .required('Skriv en stad'),
                        zip: Yup.string()
                            .matches(/^[0-9]{5}$/, 'Postnumret måste vara 5 tecken lång')
                            .required('Skriv ett postnummer'),
                        price: Yup.string()
                            //.min(-1, 'Pris kan inte vara negativ')
                            .required('Skriv ett pris')
                    })}
                    onSubmit={(fields, {resetForm}) => {
                        if (isLoggedIn) {
							sendNewAd(fields);
							resetForm();
                        } else {
                            console.log('trying to submit without login in');
                        }
                    }}
                    render={({ errors, touched, values, isValid, isSubmitting}) => (
                        <Form>
                            <div>
                            <label htmlFor="type">Annons typ*</label>
                            <FieldArray
                                name="addType"
                                render={arrayHelpers => (
                                <div className={'checkboxes'}>
                                    {categories.map(category => (
                                        <div key={category.id} className="checkbox customcheck">
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
												<span className={"checkmark" + (typeof errors.addType === 'string' ? ' is-invalid' : '')}></span>
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

							<div>
								<label htmlFor="header">Rubrik*</label>
								<Field name="header" type="text" className={errors.header && touched.header ? ' is-invalid' : ''} placeholder="ex. Musik lärare" />
								<ErrorMessage name="header" component="div" className="invalid-feedback" />
							</div>
							<div>
								<label htmlFor="category">Kategori*</label>
								<Field component="select" name="category" type="select" className={'select' + (errors.category && touched.category ? ' is-invalid' : '')} >
									<option value=""></option>
									<option value="djur">Djur</option>
									<option value="fritid">Fritid</option>
									<option value="hushållshjälp">Hushållsnära tjänster</option>
									<option value="musik">Musik</option>
									<option value="transport">Transport</option>
									<option value="trädgård">Trädgård</option>
									<option value="undervisning">Undervisning</option>
									<option value="övrigt">Övrigt</option>
								</Field>
								<ErrorMessage name="category" component="div" className="invalid-feedback" />
							</div>
							<div>
								<label htmlFor="description">Beskrivning*</label>
								<Field component="textarea" name="description" type="textarea" className={errors.description && touched.description ? ' is-invalid' : ''} placeholder="tips: annonstext borde vara beskrivande av tjänsten och längre än 20 tecken"/>
								<ErrorMessage name="description" component="div" className="invalid-feedback" />
							</div>
							<div>
								<label htmlFor="specialRequirements">Särskild önskemål</label>
								<Field name="specialRequirements" type="text" placeholder="ex. kan läsa noter" />
							</div>
							<div>
								<label htmlFor="city">Stad*</label>
								<Field name="city" type="text" className={errors.city && touched.city ? ' is-invalid' : ''} placeholder="ex. Göteborg" />
								<ErrorMessage name="city" component="div" className="invalid-feedback" />
							</div>
							<div>
								<label htmlFor="street">Gatuadress</label>
								<Field name="street" type="text" placeholder="ex. Storgatan 1A" />
							</div>
							<div className="shortInputs">
								<div className="shortInput">
									<label htmlFor="zip">Postnummer*</label>
									<Field name="zip" type="text" className={errors.zip && touched.zip ? ' is-invalid' : ''} placeholder="ex. 40530" />
									<ErrorMessage name="zip" component="div" className="invalid-feedback" />
								</div>
								<div className="shortInput">
									<label htmlFor="price">Pris* (kr)</label>
									<Field name="price" type="text" className={errors.price && touched.price ? ' is-invalid' : ''} placeholder="ex. 100" />
									<ErrorMessage name="price" component="div" className="invalid-feedback" />
								</div>
							</div>
							<div className="obligatorisk">*obligatorisk</div>
							<div>
								<button type="submit" className="formButton call" onClick={() => UserInformation(isValid)} disabled={isSubmitting}>Publicera</button>
								{/* <button type="reset" className="resetButton" onClick={() => setIsValid(false)}>Återställ</button> */}
								<button type="button" onClick={() => setVisibility(!visibility)}>Förhandsgranska annons</button>
							</div>
							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
							{visibility ? <ReviewAd values={JSON.stringify(values)} onClose={() => setVisibility(!visibility)} /> : null}
						</Form>
					)}
				/>
				{valid ? <ErrorMsg>{errorMessage}</ErrorMsg> : null}
				{messageSent ? <GreenMessage /> : null}
			</main>
		</div>
	);
};

export default CreateAdd;