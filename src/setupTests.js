import {apiInit, initTestApiCache, testAs} from "@pepfar-react-lib/http-tools";
import {baseUrl} from "./config/configProvider";
initTestApiCache();
apiInit(baseUrl,process.env.NODE_ENV);
testAs('superAdmin');