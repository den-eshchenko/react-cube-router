import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { setSizeStyleProperty } from "../utils/setSizeStyleProperty";

export const useNavigateWithSearchParams = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const previousSide = searchParams.get('previousSide');

    const navigateWithSearchParams = (nextSide: string, scale3d = '.3, .3, .3') => {
        if (nextSide.split('/')[1] === previousSide) {
            return;
        }

        const options = {
            pathname: nextSide,
            search: `?${createSearchParams({ previousSide: previousSide || 'front_side' })}`,
        };

        setSizeStyleProperty(scale3d);
        navigate(options);
    };

    return { navigateWithSearchParams };
};