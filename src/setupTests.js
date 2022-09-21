import {configure} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import {register, setTestUsername} from "@pepfar-react-lib/datim-api";

register(process.env.NODE_ENV, process.env.REACT_APP_BASE_URL)
setTestUsername(`test-de-superAdmin`,`Basic ${btoa(`test-de-superAdmin:Cypress1!`)}`);
configure({testIdAttribute: 'data-test'})