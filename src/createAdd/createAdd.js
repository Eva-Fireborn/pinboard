import React, { useState } from 'react';

//const listWithData = [];

const CreateAdd = () => {
    const [value, setValue] = useState('');
    //const [list, setList] = useState(listWithData);

    const handleChange = event => {
        setValue(event.target.value);
    }

    const handleSubmit = event => {
        // if (value) {
        //     setList(list.concat({value}));
        // }
        // setValue('');
        // console.log(list);
        event.preventDefault();
    }

    
    return (
        <div id="wrapper">
            <div className="formContainer">
                <h5 className="rubrik">Skapa annons</h5>
                <form onSubmit={handleSubmit}>
                    <div className="checkboxes">
                        <label>
                            <input type="checkbox" /> Sökes
                        </label>
                        <label>
                            <input type="checkbox" /> Finnes
                        </label>
                    </div>
                    <div className="addInfo">
                        <label>Rubrik
                            <input type="text" value={value} onChange={handleChange} />
                        </label>
                        <label>Kategori
                        <select name="categories">
                            <option selected></option>
				            <option value="musik">musik</option>
				            <option value="mat">mat</option>
                            <option value="transport">transport</option>
                            <option value="hem">hem</option>
                            <option value="städning">städning</option>
			            </select>
                        </label>
                        <label>Beskrivning<textarea /></label>
                        <label>Särskild önskemål<input /></label>
                        <label>Stad<input /></label>
                        <label>Gatuadress*<input /></label>
                        <label className="shortInput" >Postnummer<input /></label>
                        <label className="shortInput" >Pris<input  /></label>
                       
                    </div>
                    <button type="submit" className="formButton">Publicera</button>
                </form> 
                <span>*valfri</span>  
            </div>
            <div className="tipsContainer">
                <h5 className="rubrik">Tips och råd</h5>
                <div>
                    <p>Choose a realiable customer / provider</p>
                    <p>What's a good price for a service</p>
                    <p>How to write a good add</p>
                    <p>How to pay/get payed for the service</p>
                    <p>How to avoid fraud</p>
                </div>
            </div>
        </div>
    );
};

export default CreateAdd;