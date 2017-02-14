import {ICompactDashboardProps} from '../components/CompactDashboard/CompactDashboard.Props';

export const classListExample =  {
    ok: 'green',
    warning: 'yellow',
    critical: 'red',
    offline: 'offline'
};

export const farms : ICompactDashboardProps = {
    title: 'Compact dashboard view',
    farms: [
        {
            farmId: 'id1',
            farmName: 'MojaFarma',
            isCustom: false,
            sharepointVersion: '14',
            sharepointVersionIcon: 'icon-SharePoint',
            configDB: 'myConfigDB',
            confgiDBIcon: 'icon-EditUser',
            servers: [
                 { 
                    serverId: 'Banana-PC.domena.domena12121',
                    serverName: 'Banana-PC1',
                    roleList: [],
                    status: 4,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                 { 
                    serverId: 'Banana-PC.domena.domenaaaa1212',
                    serverName: 'Banana-PCB',
                    roleList: [],
                    status: 4,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabuka12-PC.domena.domena1212',
                    serverName: 'Jabuka-PC2',
                    roleList: [],
                    status: 4, 
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                { 
                    serverId: 'Banana-PC.domena.domena',
                    serverName: 'Banana-PC1',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                 { 
                    serverId: 'Banana-PC.domena.domenaaaa',
                    serverName: 'Banana-PCB',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabuka12-PC.domena.domena',
                    serverName: 'Jabuka-PC2',
                    roleList: [],
                    status: 1, 
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Tresnja0-PC.domena.domena1',
                    serverName: 'Tresnja-PC3',
                    roleList: [],
                    classNameList: classListExample,
                    status: 2,
                     onRoleEdit: () => {},
                    onServerClose: () => {}
                }, {
                    serverId: 'Banana-PC000.domena.domena1',
                    serverName: 'Banana-PCA',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jaabuka-PC.domena.domena1',
                    serverName: 'Jabuka-PCB',
                    roleList: [],
                    status: 1, 
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Trresnja-PC.domena.domena',
                    serverName: 'Tresnja-PCC',
                    roleList: [],
                    classNameList: classListExample,
                    status: 2,
                     onRoleEdit: () => {},
                    onServerClose: () => {}
                }, {
                    serverId: 'Banana-PC.domena.domena12',
                    serverName: 'Banana-PC',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabuka-PC.domena.domena12',
                    serverName: 'Jabuka-PC',
                    roleList: [],
                    status: 1, 
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Tresnja-PC.domena.domena2',
                    serverName: 'Tresnja-PC',
                    roleList: [],
                    classNameList: classListExample,
                    status: 2,
                     onRoleEdit: () => {},
                    onServerClose: () => {}
                }
            ]
        },
         {
            farmId: 'id2',
            farmName: 'Prva MojaDrugaFarma',
            isCustom: true,
            sharepointVersion: '11',
            sharepointVersionIcon: 'icon-SharePoint',
            configDB: 'myConfigDB',
            confgiDBIcon: 'icon-EditUser',
            servers: [
                {
                    serverId: 'Banana-PC.domena.domena',
                    serverName: 'Banana-PC',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabuka-PC.domena.domena',
                    serverName: 'Jabuka-PC',
                    roleList: [],
                    status: 1,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Tresnja-PC.domena.domena',
                    serverName: 'Tresnjaaaaaaaaaaa-PC',
                    roleList: [],
                    status: 2,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                }
            ]
        },         {
            farmId: 'id23',
            farmName: 'Druga MojaDrugaFarma',
            isCustom: true,
            sharepointVersion: '11',
            sharepointVersionIcon: 'icon-SharePoint',
            configDB: 'myConfigDB',
            confgiDBIcon: 'icon-EditUser',
            servers: [
                {
                    serverId: 'Banana-PC.domena.domena',
                    serverName: 'Banana-PC',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabuka-PC.domena.domena',
                    serverName: 'Jabuka-PC',
                    roleList: [],
                    status: 1,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Tresnja-PC.domena.domenwea',
                    serverName: 'Tresnjaaaaaaaaweweaaa-PC',
                    roleList: [],
                    status: 2,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                }, {
                    serverId: 'Banana-PC.domewewena.domena',
                    serverName: 'Bananawewe-PC',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabukawewe-PC.domena.domena',
                    serverName: 'Jabuweweka-PC',
                    roleList: [],
                    status: 1,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                }
            ]
        },         {
            farmId: 'id235',
            farmName: 'Treća MojaDrugaFarma',
            isCustom: true,
            sharepointVersion: '11',
            sharepointVersionIcon: 'icon-SharePoint',
            configDB: 'myConfigDB',
            confgiDBIcon: 'icon-EditUser',
            servers: [
                {
                    serverId: 'Banana-PC.domena.domena',
                    serverName: 'Banana-PC',
                    roleList: [],
                    status: 0,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Jabuka-PC.domena.domena',
                    serverName: 'Jabuka-PC',
                    roleList: [],
                    status: 1,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                },
                {
                    serverId: 'Tresnja-PC.domena.domena',
                    serverName: 'Tresnjaaaaaaaaaaa-PC',
                    roleList: [],
                    status: 2,
                    classNameList: classListExample,
                    onRoleEdit: () => {},
                    onServerClose: () => {}
                }
            ]
        }
    ]
};
