import React from "react";
//import CategoryList from "./CategoryList.js";
import SingleAdCard from "./SingleAdCard.js";
import SearchView from "./SearchView.js";

class AdsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfAds: [],
			selectedCategory: '',
			filteredByCategoryList: [],
			searchWord: '',
			filteredBySearchWord: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:4000/ApiGetAllAds")
            .then(res => res.json())
            .then(
                result => {
                    let parsedResult = JSON.parse(result.body);
                    let ads = [];
                    parsedResult.forEach(res => {
                        ads.push(res);
                    });
                    return this.setState({
                        listOfAds: ads
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                error => {
                    console.log(error);
                }
            );
    }

    render() {
        const category = [
            { title: "Djur" },
            { title: "Fritid & hobby" },
            { title: "Hushållsnära tjänster" },
            { title: "Musik" },
            { title: "Transport" },
            { title: "Trädgård" },
            { title: "Undervisning" },
            { title: "Övrigt" }
        ];

        const selectCategory = category => {
            this.setState({ selectedCategory: category });
            let filteredByCategoryList = this.state.listOfAds.filter(
                ad => ad.category.toUpperCase() === category.toUpperCase()
            );
            this.setState({filteredByCategoryList: filteredByCategoryList});
        };

		let ads;

		if (this.state.selectedCategory === '' && this.state.listOfAds && this.state.listOfAds.length) {
			ads = this.state.listOfAds.map((ad, key) => (
				<SingleAdCard key={key} adObject={ad} isLoggedIn={this.props.isLoggedIn}/> ))
		} else if (this.state.selectedCategory !== '' && this.state.filteredByCategoryList && this.state.filteredByCategoryList.length) {
			ads = this.state.filteredByCategoryList.map( (ad, key) => (
				<SingleAdCard key={key} adObject={ad} isLoggedIn={this.props.isLoggedIn}/> ))
		} else if (this.state.selectedCategory !== '' && this.state.filteredByCategoryList.length === 0) {
			ads = `Kunde inte hitta annonser med kategori ${this.state.selectedCategory}`;
		}  else {
			ads = null;
		}

		// else if (this.state.searchWord === '' && this.state.listOfAds && this.state.listOfAds.length) {
		// 	ads = this.state.listOfAds.map((ad, key) => (
		// 		<SingleAdCard key={key} adObject={ad} isLoggedIn={this.props.isLoggedIn}/> ))
		// }
		// else if (this.state.searchWord !== '' && this.state.filteredBySearchWord && this.state.filteredBySearchWord.length) {
		// 	ads = this.state.filteredBySearchWord.map((ad, key) => (
		// 		<SingleAdCard key={key} adObject={ad} isLoggedIn={this.props.isLoggedIn}/> ))
		// }
		// else if (this.state.searchWord !== '' && this.state.filteredBySearchWord.length === 0) {
		// 	ads = `Kunde inte hitta annonser med rubrik ${this.state.searchWord}`;
		// }
		const searchRubrik = (searchWord) => {
			this.setState({searchWord: searchWord});
			let filteredByRubrik = this.state.listOfAds.filter(ad => ad.header.toUpperCase().includes(searchWord.toUpperCase()));
			this.setState({filteredBySearchWord: filteredByRubrik});
		}

        return (
            <div id="wrapper">
                <aside className="ads">
                    <div className="fixed">
                        <SearchView searchRubrik={searchRubrik} />
                        <h3>Kategorier:</h3>
                        <ul>
                            {category.map((category, index) => (
                                <li key={index}>
                                    <h4 onClick={e => selectCategory(e.currentTarget.innerText)}>
                                        {category.title}
                                    </h4>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <CategoryList filterCategories={filterCategories} /> */}
                </aside>
                <main id="ads">
                    <ul>
						{this.state.listOfAds.length === 0 ?  <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : ads}
						{/* {ads} */}
                    </ul>
                </main>
            </div>
        );
    }
}

export default AdsView;
