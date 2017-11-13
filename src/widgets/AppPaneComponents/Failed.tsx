import * as React from 'react';

interface IProps{
    retry: Function
}

const Failed = (props:IProps) => (<h2>Failed, try again? <button onClick={() => props.retry()}>try</button></h2>);

export default Failed;