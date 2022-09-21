import {connectToDataStore} from "../modules/main/services/setupNamespace.service";
import {registerGetMock, registerSendMock} from "@pepfar-react-lib/datim-api";
import {dataStoreExists} from "./shared.testServices";

const dataStoreCreateResponse = {"httpStatus":"Created","httpStatusCode":201,"status":"OK","message":"Key 'configuration' created."};
const metaDataResponse = {"id":"metadataId1"};
const keyShareStatus = {"object": {publicAccess: "rw------"}}
const keyShareResponse = {"httpStatus":"OK","httpStatusCode":200,"status":"OK","message":"Access control set"};

test(`DataStoreInit > Empty`, async ()=>{
    dataStoreExists(false);
    let dataStore = registerSendMock('/dataStore/dashboard-information/configuration',dataStoreCreateResponse).then((request)=>{
        expect(request).toStrictEqual({ 'Only open to superusers': false });
    })
    registerGetMock('/dataStore/dashboard-information/configuration/metaData',metaDataResponse);
    registerGetMock('/sharing?type=dataStore&id=metadataId1',keyShareStatus);
    let sharing = registerSendMock('/sharing?type=dataStore&id=metadataId1',keyShareResponse).then((response)=>{
        expect(response).toStrictEqual({"object":{"id":"metadataId1","publicAccess":"r-------"}});
    })
    await connectToDataStore();
    await dataStore;
    await sharing;
})