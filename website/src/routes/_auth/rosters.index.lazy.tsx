import { Link, createLazyFileRoute, useLoaderData } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/_auth/rosters/')({
  component: Rosters
})

function Rosters(){
  const context = useLoaderData({from:"/_auth/rosters/"});
  console.log(context);
  return(
    <div>
      <ul>
        {context.result.map((i) => (
          <li key={i.rosterId}>
            <Link to="/rosters/$id" params={{id: String(i.rosterId)}}>
              {i.startingWeek}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}