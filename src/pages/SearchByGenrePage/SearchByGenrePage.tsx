import {FC} from 'react';

import {SearchByGenre} from "../../components";

interface IProps {

}

const SearchByGenrePage: FC<IProps> = () => {
    return (
        <div>
            <SearchByGenre/>
        </div>
    );
};

export {SearchByGenrePage};