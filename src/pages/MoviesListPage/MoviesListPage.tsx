import {FC} from 'react';

import {MoviesList} from "../../components";

interface IProps {

}

const MoviesListPage: FC<IProps> = () => {
    return (
        <div>
            <MoviesList/>
        </div>
    );
};

export {MoviesListPage};