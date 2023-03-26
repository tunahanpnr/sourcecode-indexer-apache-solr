import type {
    APIConnector,
    RequestState,
    QueryConfig,
    ResponseState,
    AutocompleteResponseState,
    AutocompleteQueryConfig
} from "@elastic/search-ui";
import {SolrResponse, solrResponseMapper} from "./mapper";
import {SolrQuery} from "./query";

export default class SolrConnector implements APIConnector {
    async onSearch(
        state: RequestState,
        queryConfig: QueryConfig
    ): Promise<ResponseState> {
        const {searchTerm, current, filters, sort, resultsPerPage} = state;

        const solrQuery: SolrQuery = {};

        if (searchTerm) {
            solrQuery.query = "content:" + searchTerm
        }

        if (resultsPerPage) {
            solrQuery.limit = resultsPerPage
            if (current) {
                solrQuery.offset = (current - 1) * resultsPerPage;
            }
        }

        const response = await fetch("solr/intellij_core/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solrQuery)
        });


        const res = await response.json();
        const solrResponse = res.response as SolrResponse;

        return solrResponseMapper(solrResponse, resultsPerPage) as ResponseState;
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