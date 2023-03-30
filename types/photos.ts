type User = {
  name: string,
  instagragm?: string,
}


export type Photo = {
  description: string,
  id: string,
  user: User,
}

export type Photos = Photo[]
