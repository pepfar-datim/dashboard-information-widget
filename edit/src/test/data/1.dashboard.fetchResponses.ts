import {MapOf} from "../test.types.ts";

export const dashboardFetchResponses: MapOf<object> = {
    '/api/dataStatistics?eventType=PASSIVE_DASHBOARD_VIEW&favorite=LandingPage':{},
    '/api/dashboards/LandingPage.json?fields=name,dashboardItems[id,type,appKey,width,height,x,y,map(id,name),visualization(id,name),eventReport(id,name)]': {
        "name": "DATIM",
        "dashboardItems": [
            {
                "appKey": "Information",
                "x": 0,
                "y": 22,
                "height": 18,
                "width": 25,
                "type": "APP",
                "id": "NavigInstrc"
            },
            {
                "appKey": "Information",
                "x": 0,
                "y": 0,
                "height": 22,
                "width": 59,
                "type": "APP",
                "id": "WelcomeInfo"
            },
            {
                "appKey": "Information",
                "x": 0,
                "y": 40,
                "height": 24,
                "width": 59,
                "type": "APP",
                "id": "QuickLinksy"
            },
            {
                "appKey": "Information",
                "x": 25,
                "y": 22,
                "height": 18,
                "width": 34,
                "type": "APP",
                "id": "NavigSifter"
            }
        ]
    }
}