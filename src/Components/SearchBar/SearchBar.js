import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
		};
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	search() {
		this.props.onSearch(this.state.term);
	}

	handleTermChange(event) {
		sessionStorage.setItem('term', event.target.value);
		let term = sessionStorage.getItem('term');
		this.setState({
			term: term,
		});
	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.search();
		}
	}

	componentWillMount() {
		let term = sessionStorage.getItem('term');
		if (term) {
			this.setState({
				term: term,
			});
		}
	}

	componentDidMount() {
		let term = this.state.term;
		if (term) {
			this.search();
		}
	}

	render() {
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" value={this.state.term} onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
				<a onClick={this.search} >SEARCH</a>
			</div>
		);
	}
};

export default SearchBar;