// import React, { useState } from "react";
// import SearchView from "./SearchView.js";

// const CategoryList = ({filterCategories}) => {

//     const category = [
//         { title: "Djur" },
//         { title: "Fritid & hobby" },
//         { title: "Hushållsnära tjänster" },
//         { title: "Musik" },
//         { title: "Transport" },
//         { title: "Trädgård" },
//         { title: "Undervisning" },
//         { title: "Övrigt" }
//     ];

//     const [selectedCategory, setSelectedCategory] = useState('');
// 	console.log('child: ', selectedCategory);

// 	const selectCategory = (category) => {
// 		setSelectedCategory('');
//         setSelectedCategory(category);
//         filterCategories(selectedCategory);
// 	}
    
    

//     return (
//         <div className="fixed">
//             <SearchView />
//             <h3>Kategorier:</h3>
//             <ul>
//                 {category.map((category, index) => (
//                     <li key={index}>
//                         <h4 onClick={(e) => selectCategory(e.currentTarget.innerText)}>{category.title}</h4>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CategoryList;