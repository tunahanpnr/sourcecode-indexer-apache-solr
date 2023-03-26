import type {SearchResult} from "@elastic/search-ui";


export declare type SolrResponse = {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: SearchResult[];
};

export function solrResponseMapper(obj: SolrResponse, resultsPerPage: number = 20) {
    return {
        results: obj.docs,
        totalResults: obj.numFound,
        pagingStart: obj.start,
        totalPages: Math.ceil(obj.numFound / resultsPerPage),
    };
}