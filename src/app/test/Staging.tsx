import ProgressBar from "@/component/ProgressBar/ProgressBar.tsx";
import {useState} from "react";
import {css} from "@emotion/react";

export default function Staging() {

    const [page, setPage] = useState(0);

    return (
        <section css={css`
            padding-top: 50px;
        `}>
            <ProgressBar curPage={page} lastPage={10}/>
            <div> 현재 페이지 넘버 {page}</div>
            <button onClick={() => setPage(page + 1)}> 현재 페이지 + 1</button>
            <button onClick={() => setPage(page - 1)}> 현재 페이지 - 1</button>
        </section>
    )
}