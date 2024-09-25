export interface menuManager {
    id: number
    name: string
    slug: string
    description: string
    deleted_at: any
    created_at: string
    created_by: any
    updated_at: string
    updated_by: any
    items: menuManagerItem[]
}

export interface menuManagerChildren {
    "id": number
    "menu_id": number
    "parent_id": number
    "module_id"?: number
    "title": string
    "url": string
    "target": string
    "icon"?: string
    "color"?: string
    "type": number
    "order": number
    "deleted_at": null,
    "created_at": string,
    "created_by": null,
    "updated_at": string,
}

export interface menuManagerItem extends menuManagerChildren{
    "id": number,
    "deleted_at": null,
    "created_at": string,
    "created_by": null,
    "updated_at": string,
    "updated_by": null,
    "menu_id": number
    "parent_id": number
    "module_id": number
    "title": string
    "url": string
    "target": string
    "icon": string
    "color": string
    "type": number
    "order": number
    "children": menuManagerChildren
}

export interface menuManagerData {
    id: number
    name: string
    slug: string
    description: string
    deleted_at: string
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    items: menuManagerItem[]    
}