import {FC} from 'react';

import {Error} from "../../components";

interface IProps {

}

const ErrorPage: FC<IProps> = () => {
    const errorMessage: string = "Something went wrong! Please try again later.";

    return (
        <div>
            <Error message={errorMessage}/>
        </div>
    );
};

export {ErrorPage};