import React from 'react';
import {render} from 'react-dom';
import './index.css';
import SetupWrapper from "./modules/main/components/setupWrapper.component";

function App(){
    return <SetupWrapper />;
}

render(<App/>, document.getElementById('root'));


