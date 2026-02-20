
type User = {
  id: string;
  name: string;
  role: string;
}

interface UserProps {
  users: User[];
}


export default function Users({ users }: UserProps) {
  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </>
  )
}
