import {Menu} from "/@/types/Menu";

export const dashboardMenu: Menu[] = JSON.parse(JSON.stringify([{
    "id": 1,
    "parent_id": null,
    "menu_id": 1,
    "title": "Home",
    "url": "/",
    "icon_class": "ri-line-chart-line",
    "text": "Home",
    "path": "/",
    "icon": "ri-line-chart-line",
    "target": "_self",
    "color": null,
    "type": "permission",
    "order": 0,
    "children": []
  },]
));
export const reportMenu: Menu[] = JSON.parse(JSON.stringify([{
  "id": 1,
  "parent_id": null,
  "menu_id": 1,
  "title": "Report",
  "url": "/report",
  "icon_class": "la-clipboard-list-solid",
  "text": "Report",
  "path": "/report",
  "icon": "la-clipboard-list-solid",
  "target": "_self",
  "color": null,
  "type": "permission",
  "order": 0,
  "children": []
},]
));
