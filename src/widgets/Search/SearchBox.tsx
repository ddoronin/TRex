import * as React from 'react';

interface IProps {
    onSearch: (x: String) => void
    onFocus: (isFocused: Boolean) => void
}

export const SearchBox = (props: IProps) => {
    let $input: HTMLInputElement;
    return (
        <div className="search-input">
            <input type="text"
                   placeholder="Search"
                   onFocusCapture={() => props.onFocus(true)}
                   onBlurCapture={() => props.onFocus(false)}
                   ref={input => $input = input} onChange={() => {
                if ($input) {
                    props.onSearch($input.value)
                }
            }}/>
        </div>
    );
};
