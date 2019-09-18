import React from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const CreateAdd = () => {
    let categories = [{id: 1, name: 'Sökes'}, {id: 2, name: 'Finnes'}];
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
                        alert('SUCCESS!! \n\n' + JSON.stringify(fields, null, 4))
                    }}
                    render={({ errors, status, touched, values }) => (
                        <Form>
                            
                            <FieldArray
                                name="addType"
                                render={arrayHelpers => (
                                <div className="checkboxes">
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
                                <Field name="specialRequirements" type="text"/>
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
                                <button type="submit" className="formButton">Publicera</button>
                                <button type="reset" className="resetButton">Återställ</button>
                            </div>
                            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                        </Form>
                    )}
                />
            </main>
        </div>
    );
};

export default CreateAdd;