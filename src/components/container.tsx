'use client'

import React, { useOptimistic, useState, useTransition } from 'react'
import { v4 as uuid } from 'uuid'

import { addTodo } from '../lib/actions/todos'
import { type Todo } from '../lib/model/index'

interface ContainerProps {
  data: Todo[]
}

export default function Container({ data }: ContainerProps) {
  const [name, setName] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const [optimisticTodos, setOptimisticTodo] = useOptimistic<Todo[], Todo>(
    data,
    (data, newTodo) => [...data, { ...newTodo, sending: true }],
  )

  const handleAdd = () => {
    startTransition(async () => {
      setOptimisticTodo({ id: uuid(), name })
      await addTodo({ id: uuid(), name })
    })
    setName('')
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <div className="text-2xl">
          Transition state: {isPending ? 'pending' : 'done'}
        </div>
        <input
          className="border-2 border-slate-300"
          type="text"
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={name}
        />
        <button className="bg-slate-300 rounded-md p-2" onClick={handleAdd}>
          Add Todo
        </button>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <h1 className="text-2xl">Todo List</h1>
        {optimisticTodos?.map((optimisticTodo) => {
          return optimisticTodo.sending! ? (
            <div key={optimisticTodo.id}>Sending for {optimisticTodo.name}</div>
          ) : (
            <div key={optimisticTodo.id}>{optimisticTodo.name}</div>
          )
        })}
      </div>
    </div>
  )
}
