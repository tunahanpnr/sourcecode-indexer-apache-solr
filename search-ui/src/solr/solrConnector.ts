import type {
    APIConnector,
    AutocompleteQueryConfig,
    AutocompleteResponseState,
    QueryConfig,
    RequestState,
    ResponseState
} from "@elastic/search-ui";

export default class SolrConnector implements APIConnector {
    async onSearch(
        state: RequestState,
        queryConfig: QueryConfig
    ): Promise<ResponseState> {
        const {searchTerm, current, filters, sort, resultsPerPage} = state;

        const query = "content:" + searchTerm;
        const response = await fetch("http://localhost:8983/solr/intellij_core/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        });


        return await response.json();
    }

    async onAutocomplete(
        state: RequestState,
        queryConfig: AutocompleteQueryConfig
    ): Promise<AutocompleteResponseState> {
        const response = await fetch(
            "https://api.my-host/autocomplete?query" + state.searchTerm,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        // response will need to be in the shape of AutocompleteResponseState.
        // Alternatively you could transform the response here
        return response.json();
    }

    onResultClick(params: any): void {
        console.log(
            "perform a call to the API to highlight a result has been clicked"
        );
    }

    onAutocompleteResultClick(params: any): void {
        console.log(
            "perform a call to the API to highlight an autocomplete result has been clicked"
        );
    }

    state: any;
}