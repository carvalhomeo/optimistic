'use server'

import { unstable_cache as cache, revalidateTag } from 'next/cache'

import { type Todo } from '@/lib/model'

const todoList: Todo[] = []

export const getTodos = cache(
  async () => {
    const todos = todoList
    return await new Promise<Todo[]>((resolve) => {
      resolve(todos)
    })
  },
  ['todos'],
  { tags: ['todos'] },
)

export async function addTodo(todo: Todo) {
  await new Promise<Todo>((resolve) => {
    setTimeout(() => {
      todoList.push(todo)
      resolve(todo)
    }, 5000)
    return todo
  })

  revalidateTag('todos')

  return todo
}
