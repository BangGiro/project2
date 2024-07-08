import FAQlist from './components/FAQlist'
import FAQheader from './components/FAQheader';
import './FAQ.css';
import FloatingButton from '../../layout/FloatingButton';
import { useCallback, useEffect } from 'react';


const FAQpage = function() {

    return(
        <div className="FAQpage">
            <FAQheader />
            <FAQlist />
            <FloatingButton />
        </div>
    )
};

export default FAQpage;


