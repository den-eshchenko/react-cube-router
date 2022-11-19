import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { setSizeStyleProperty } from "../utils/setSizeStyleProperty";
// import { setRotationStyleProperty } from "../utils/setRotationStyleProperty";

export const useNavigateWithSearchParams = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const previousSide = searchParams.get('previousSide') || 'front_side';

    const navigateWithSearchParams = (nextSide: string) => {
        const options = {
            pathname: nextSide,
            search: `?${createSearchParams({ previousSide: previousSide })}`,
        };

        // setRotationStyleProperty(nextSide);
        setSizeStyleProperty(10);
        navigate(options);
    };

    return { navigateWithSearchParams };
};