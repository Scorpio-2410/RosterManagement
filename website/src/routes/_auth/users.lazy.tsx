import { useQuery, useMutation } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/users')({
  component: Users
})

type User = {
  id: number;
  name: string;
};

function Users() {
  const {data, error, isLoading} = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res.json()
    ),
  });

const {mutate, isPending, isError} = useMutation({mutationFn: (user: User) => 
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {"Content-type": "application/json; charset=UTF-8"},
  }).then((res) => res.json()),
});

  if (error || isError) return <div>There was an error!</div>;

  if(isLoading) return <div>Data is Loading.....</div>;

  return (
    <div className='Dashboard'>
      {/* Ispending is true and this will be shown */}
      {isPending && <p>Data is being added...</p>}
      <button 
        onClick={() => 
          mutate({
            id: 200,
            name: "Nabidul Islam"
          })
        }
      >
        Add Post
      </button>
      {data && data.map((user) => (
        <div>
          {" "}
          <h1>ID: {user.id}</h1>
          <h1>Name: {user.name}</h1>
        </div>
      ))}
    </div>
  );
}


  