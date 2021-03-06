import * as React from 'react';
import {SearchBox} from "./Search/SearchBox";
import {Recent} from "./Search/Recent";
import {ISearchController, Asset} from "../controllers/SearchController";
import Api from "../api/controllerFactory";
import {HttpBag} from "../models/HttpBag";
import {HttpStatus} from "../models/HttpStatus";
import {HttpError} from "../models/HttpError";

interface IProps{
}

interface IState {
    recentVisible: Boolean,
    recentFragment: JSX.Element
}

class SearchWidget extends React.Component<IProps, IState> {
    private readonly searchController:ISearchController = Api.get('ISearchController');

    constructor(props: IProps) {
        super(props);

        this.state = {
            recentVisible: false,
            recentFragment: null
        };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleFocus(isFocused: Boolean) {
        this.setState({recentVisible: isFocused});
        if(isFocused){
            this.searchController
                .recent()
                .subscribe(assetsBag => this.setState({recentFragment: this.renderFragment(assetsBag)}));
        }
    }

    renderFragment(assetsBag: HttpBag<Array<Asset>, HttpError>): JSX.Element {
        switch (assetsBag.status) {
            case HttpStatus.Pending:
                return (<div>Loading...</div>);

            case HttpStatus.Succeeded:
                return <Recent/>

            case HttpStatus.Failed:
                return <div>Error</div>

            default:
                return null;
        }
    }


    handleSearch(searchText: String) {
        console.log(searchText)
    }

    render(): JSX.Element {
        return (
            <article className="search-widget">
                <section className="search-box">
                    <SearchBox onFocus={this.handleFocus}
                               onSearch={this.handleSearch}/>
                </section>
                {this.state.recentVisible && <section className="recent-box">
                    {this.state.recentFragment}
                </section>}
            </article>
        );
    }
}

export default SearchWidget;