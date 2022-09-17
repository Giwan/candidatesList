import { useRef, useEffect } from "react";

type ClearFilterComponentProps = {
    clearFilter: Function;
};

const ClearFilterComponent = ({ clearFilter }: ClearFilterComponentProps) => {
    const buttonElement = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const keyboardClearFilter = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            clearFilter();
            buttonElement?.current?.focus();
        };
        document.addEventListener("keyup", keyboardClearFilter);
        return () => document.removeEventListener("keyup", keyboardClearFilter);
    }, [clearFilter]);

    const _clearFilter = () => clearFilter();

    return (
        <button type="reset" onClick={_clearFilter} ref={buttonElement}>
            Clear filters
        </button>
    );
};

export default ClearFilterComponent;
