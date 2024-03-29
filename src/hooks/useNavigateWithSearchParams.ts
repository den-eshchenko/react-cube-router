import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TNavigateWithSearchParams = {
    nextSide: string
}

export const useNavigateWithSearchParams = () => {
    const navigate = useNavigate()
    const params = useParams();
    const currentSide = params.side || '';

    const navigateWithSearchParams = useCallback(({ nextSide}: TNavigateWithSearchParams) => {
        if (nextSide.split('/')[1] === currentSide) {
            return
        }

        const options = {
            pathname: nextSide,
            // search: `?${createSearchParams({ previousSide: previousSide || 'front_side' })}`,
        };

        navigate(options)
    }, [currentSide, navigate])

    return { navigateWithSearchParams }
}