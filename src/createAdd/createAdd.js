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
                            .required('At least one checkbox is required'),
                        header: Yup.string()
                            .required('Rubrik is required'),
                        category: Yup.string()
                            .required('Category is required'),
                        description: Yup.string()
                            .min(20, 'description must be at least 20 characters')
                            .required('Description is required'),
                        city:  Yup.string()
                            .required('City is required'),
                        zip: Yup.string()
                            .matches(/^[0-9]{5}$/, 'Must be exactly 5 digits')
                            .required('Post code is required'),
                        price: Yup.number()
                            .positive('Price must be higher than 0')
                            .required('Price is required')
                    })}
                    onSubmit={fields => {
                        alert('SUCCESS!! \n\n' + JSON.stringify(fields, null, 4))
                    }}
                    render={({ errors, status, touched, values }) => (
                        <Form>
                            <FieldArray
                                name="addType"
                                render={arrayHelpers => (
                                <div>
                                    {categories.map(category => (
                                        <div key={category.id} className="checkboxes">
                                            <label>
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
                                            {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                )}
                            />
                            { typeof errors.addType === 'string' ? <ErrorMessage name="addType" component="div" className="invalid-feedback" /> : null} 
                    
                            <div className="form-group">
                                <label htmlFor="header">Rubrik*</label>
                                <Field name="header" type="text" className={'form-control' + (errors.header && touched.header ? ' is-invalid' : '')} />
                                <ErrorMessage name="header" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Kategori*</label>
                                <Field component="select" name="category" type="select" className={'form-control' + (errors.category && touched.category ? 'is-invalid' : '')}>
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
                            <div className="form-group shortInput">
                                <label htmlFor="zip">Postnummer*</label>
                                <Field name="zip" type="text" className={'form-control shortInput' + (errors.zip && touched.zip ? ' is-invalid' : '')} />
                                <ErrorMessage name="zip" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group shortInput">
                                <label htmlFor="price">Pris*</label>
                                <Field name="price" type="text" className={'form-control shortInput' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                <ErrorMessage name="price" component="div" className="invalid-feedback" />
                            </div>
                            <div>*obligatorisk</div> 
                            <div className="form-group">
                                <button type="submit" className="formButton">Publicera</button>
                                <button type="reset">Reset</button>
                            </div>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>
                    )}
                />
            </main>
        </div>
    );
};

export default CreateAdd;