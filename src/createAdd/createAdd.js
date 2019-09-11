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
            <main className="formContainer">
                <h3 className="rubrik">Skapa annons</h3>
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
                                <option value=""></option>
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
                        <div className="shortInput">
                            <label>Postnummer<input/></label>
                        </div>
                        <div className="shortInput">
                            <label>Pris<input/></label>
                        </div>
                        
                       
                    </div>
                    <button type="submit" className="formButton">Publicera</button>
                </form> 
                <span>*valfri</span>  
            </main>
            <aside className="tipsContainer">
                <h3 className="rubrik">Tips och råd</h3>
                    <ul>
                        <li>Hur kan man välja en pålitlig kund/leverantör</li>
                        <li>Vad är ett bra pris för en tjänst</li>
                        <li>Hur skriver man ett bra annons</li>
                        <li>Hur betalar man (får betalt) för en tjänst</li>
                        <li>Hur undviker man bedrägeri</li>
                    </ul>
            </aside>
        </div>
    );
};

export default CreateAdd;