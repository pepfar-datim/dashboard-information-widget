import {apiInit, initTestApiCache, testAs} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./config/configProvider";
import {configure} from '@testing-library/react'
initTestApiCache();
apiInit(baseUrl,process.env.NODE_ENV);
testAs('superAdmin');
configure({testIdAttribute: 'data-test'})