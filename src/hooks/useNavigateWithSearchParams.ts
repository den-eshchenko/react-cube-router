import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import { setRotationStyleProperty } from "../utils/setRotationStyleProperty";
import { setSizeStyleProperty } from "../utils/setSizeStyleProperty";

type TNavigateWithSearchParams = {
    nextSide: string
    scale3d?: string
}

export const useNavigateWithSearchParams = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const previousSide = searchParams.get('previousSide')

    const navigateWithSearchParams = ({ nextSide, scale3d = '1, 1, 1'}: TNavigateWithSearchParams) => {
        if (nextSide.split('/')[1] === previousSide) {
            return
        }

        const options = {
            pathname: nextSide,
            search: `?${createSearchParams({ previousSide: previousSide || 'front_side' })}`,
        };

        setRotationStyleProperty(nextSide);
        // setSizeStyleProperty(scale3d)
        navigate(options)
    }

    return { navigateWithSearchParams }
}