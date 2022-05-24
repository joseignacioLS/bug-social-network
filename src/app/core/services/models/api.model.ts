export interface IBug {
  _id: string
  createdAt: string
  user: string
  name: string
  description?: string
  image?: string
  location?: string
  tags?: string
}

export interface INewBug {
  user: string
  name: string
  createdAt: string
  description?: string
  image?: string
  location?: string
  tags?: string
}