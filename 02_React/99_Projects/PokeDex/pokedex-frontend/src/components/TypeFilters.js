import '../styles/TypeFilters.css';
import { useState } from 'react';

export default function TypeFilters() {
    const [filtersOpened, openFilters] = useState(false);
    return (
        <>
            <button id="open_filters" onClick={() => openFilters(!filtersOpened)}>Open Filters</button>
            {filtersOpened && <div className='testbox'></div>}
        </>
    );
}