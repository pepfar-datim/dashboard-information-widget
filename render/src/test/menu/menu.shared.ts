import {MapOf} from "../test.service.ts";
import {fireEvent, screen} from "@testing-library/dom";

export const dataStore: MapOf<object> = {
    '/api/dataStore/dashboard-information': [
        'allowedUrls',
        'WidgetId'
    ],
    '/api/dataStore/dashboard-information/allowedUrls': [
        'https://www.youtube.com/'
    ],
    '/api/dataStore/dashboard-information/WidgetId': {
        "body": "<p style=\"font-size:10px\">&nbsp;<br></p>\n<pre type=\"nestedMenu\" style=\"height:200px\">Data Review {font-weight: 500}:\n  MER Result and Target Review Favorites: /dhis-web-dashboard/#/ddwNwfGWWsp\n  World AIDS Day Review: /dhis-web-dashboard/#/SEmvZjJIXrg\n  Dedupe Dashboard: /dhis-web-dashboard/#/i3OhPlqNTcr\n  Approvals Dashboard: /dhis-web-dashboard/#/CWa3HjzJMi5\n  SRE Dashboard: /dhis-web-dashboard/#/aDgKm3fFLO7\nData Analysis {font-weight: 500}:\n  {min-width: 200px}:\n  Thematic Dashboards:\n    COP19/FY20: \n      Clinical Cascade: /dhis-web-dashboard/#/d1saiOSfQBd\n      Testing: /dhis-web-dashboard/#/hCUxXRhOKRs\n      Treatment: /dhis-web-dashboard/#/DG71ebj5nDR\n      PMTCT: /dhis-web-dashboard/#/WUMxLpjpxsC\n      Key Pops and Prevention: /dhis-web-dashboard/#/qT16cnSZgyC\n      Cervical Cancer: /dhis-web-dashboard/#/sD0NuEg14eu\n      TB Cascade: /dhis-web-dashboard/#/MKN9JiZXg6n\n    COP20/FY21:\n      Clinical Cascade: /dhis-web-dashboard/#/lCeICs4hLbi\n      Testing: /dhis-web-dashboard/#/t03bMEn2mBm\n      Treatment: /dhis-web-dashboard/#/JH3rXxLrnlR\n      PMTCT: /dhis-web-dashboard/#/T5jQaKxK3hX\n      Key Pops and Prevention: /dhis-web-dashboard/#/FHOuaQrsU1f\n      Cervical Cancer: /dhis-web-dashboard/#/SRyMbcVjLsG\n      TB Cascade: /dhis-web-dashboard/#/H65uRxO34pA\n    COP21/FY22:\n      Clinical Cascade: /dhis-web-dashboard/#/HviR0NxaVEB\n      Testing: /dhis-web-dashboard/#/tNYZKTpVK9s\n      Treatment: /dhis-web-dashboard/#/ghrQkAsEK11\n      PMTCT: /dhis-web-dashboard/#/EL1xKf4BcZD\n      Key Pops and Prevention: /dhis-web-dashboard/#/mfNqvH2GLki\n      Cervical Cancer: /dhis-web-dashboard/#/wCnSPimAwYp\n      TB Cascade: /dhis-web-dashboard/#/HpRmwxSGmnS\n    COP22/FY23:\n      Clinical Cascade: /dhis-web-dashboard/#/y1Rk1rBpYiL\n      Testing: /dhis-web-dashboard/#/MC0FlH7lVuO\n      Treatment: /dhis-web-dashboard/#/ckV2ZOdeymW\n      PMTCT: /dhis-web-dashboard/#/vg1EJP4mraq\n      Key Pops and Prevention: /dhis-web-dashboard/#/llyXwqQKtxG\n      Cervical Cancer: /dhis-web-dashboard/#/QQfy2j27kJC\n      TB Cascade: /dhis-web-dashboard/#/caMTdhcKA6V\n  COP Analysis Dashboards:\n    COP20: /dhis-web-dashboard/#/lsvZYSi0GEC\n    COP21: /dhis-web-dashboard/#/X5NlX7LbO6g\n    COP22: /dhis-web-dashboard/#/jdjFPxonDQL\n    COP23: \n        Analysis Dashboard: /dhis-web-dashboard/#/EYVNCtpipx8\n        Review Dashboard: /dhis-web-dashboard/#/UwPIkZjFY0U\n\n</pre>"
    }
}

export async function explore(node: string): Promise<void> {
    await screen.findByText(node)
    fireEvent.click(screen.getByText(node))
}