import {FC} from 'react';

import {Search} from "../../components";


interface IProps {

}

const SearchPage: FC<IProps> = () => {
    return (
        <div>
            <Search/>
        </div>
    );
};

export {SearchPage};