import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { setSizeStyleProperty } from "../utils/setSizeStyleProperty";

export const useNavigateWithSearchParams = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const previousSide = searchParams.get('previousSide') || 'front_side';

    const navigateWithSearchParams = (nextSide: string, scale3d = '.5, .5, .5') => {
        if (nextSide.split('/')[1] === previousSide) {
            return;
        }

        const options = {
            pathname: nextSide,
            search: `?${createSearchParams({ previousSide: previousSide })}`,
        };

        setSizeStyleProperty(scale3d);
        navigate(options);
    };

    return { navigateWithSearchParams };
};