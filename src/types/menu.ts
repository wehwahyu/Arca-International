export interface Menu {
  id: number
  name: string
  slug: string
  description: string
  deleted_at: string
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
  children: MenuItems[]
}

export interface MenuItems {
  id: number
  menu_id: number
  permission_id: number
  title: string
  url: string
  target: string
  icon_class: string
  icon: string
  color: string
  type: string
  parent_id: number
  order: number
  created_at: string
  updated_at: string
  children: MenuItems[]
}
