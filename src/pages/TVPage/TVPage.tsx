import {FC} from 'react';

import {TvList} from "../../components";

interface IProps {

}

const TvPage: FC<IProps> = () => {
    return (
        <div>
            <TvList/>
        </div>
    );
};

export {TvPage};