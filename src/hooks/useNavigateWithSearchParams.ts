import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { setSizeStyleProperty } from "../utils/setSizeStyleProperty";

export const useNavigateWithSearchParams = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const previousSide = searchParams.get('previousSide') || 'front_side';

    const navigateWithSearchParams = (nextSide: string, size = 10) => {
        const options = {
            pathname: nextSide,
            search: `?${createSearchParams({ previousSide: previousSide })}`,
        };

        setSizeStyleProperty(size);
        navigate(options);
    };

    return { navigateWithSearchParams };
};