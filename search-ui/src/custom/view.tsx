import {SearchResult} from "@elastic/search-ui";

export const CustomPagingInfoView = ({start, end}: {
    start: number;
    end: number;
}) => (
    <div className="paging-info">
        <strong>
            {start} - {end}
        </strong>
    </div>
);

export const CustomResultView = ({result}: {
    result: SearchResult;
    onClickLink: () => void;
}) => (
    <li className="sui-result">
        <div className="sui-result__header">
            <h3>
                {result.filename}
            </h3>
        </div>
        <div className="sui-result__header">
            <h5>
                {result.content_type}
            </h5>
        </div>
        <div className="sui-result__body">
            <div
                className="sui-result__details"
                dangerouslySetInnerHTML={{__html: result.content}}
            ></div>
        </div>
    </li>
);