// @ts-nocheck

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "./custom.css";
import {
    ErrorBoundary,
    SearchProvider,
    SearchBox,
    Results,
    PagingInfo,
    ResultsPerPage,
    Paging,
    WithSearch
} from "@elastic/react-search-ui";
import {Layout} from "@elastic/react-search-ui-views";



const config = {
    searchQuery: {
        search_fields: {
            filename: {},
            content_type: {},
            content: {},
        },
        result_fields: {
            filename: {},
            content_type: {},
            content: {},
            created_date: {},
            id: {},
            _version_: {},
        },
        disjunctiveFacets: {},
        facets: {},
    },
    autocompleteQuery: {},
    alwaysSearchOnInitialLoad: false
};

export default function App() {
    return (
        <SearchProvider config={config}>
            <WithSearch mapContextToProps={({wasSearched}) => ({wasSearched})}>
                {({wasSearched}) => {
                    return (
                        <div className="App">
                            <ErrorBoundary>
                                <Layout
                                    header={
                                        <SearchBox autocompleteSuggestions={true}/>
                                    }
                                    sideContent={
                                        <div></div>
                                    }
                                    bodyContent={
                                        <Results
                                            shouldTrackClickThrough={true}
                                        />
                                    }
                                    bodyHeader={
                                        <React.Fragment>
                                            {wasSearched && <PagingInfo />}
                                            {wasSearched && <ResultsPerPage />}
                                        </React.Fragment>
                                    }
                                    bodyFooter={<Paging/>}
                                />
                            </ErrorBoundary>
                        </div>
                    );
                }}
            </WithSearch>
        </SearchProvider>
    );
}
