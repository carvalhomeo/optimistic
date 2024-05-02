import { getTodos } from '@/lib/actions/todos'
import Container from '@/components/container'

export default async function Home() {
  const todos = await getTodos()

  return <Container data={todos} />
}
