import {MouseEventHandler} from "react";

interface PageProps {
    onPageSub: MouseEventHandler<HTMLSpanElement>,
    onPageAdd: MouseEventHandler<HTMLSpanElement>,
    getPage: Function
    // setPage: Function
}

// 底部分页组件 < 0 >
export const PageBottom = (props: PageProps) => {
    return (
        <div className={'flex my-4 flex-row justify-center w-full gap-3 text-lg'}>
            <span className={'rounded hover:bg-green-300 p-1'}
                  onClick={props.onPageSub}>&lt;</span>
            <span className={'rounded p-1'}>{props.getPage()}</span>
            <span className={'rounded hover:bg-green-300 p-1'}
                  onClick={props.onPageAdd}>&gt;</span>
        </div>
    );
};