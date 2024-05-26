import { Link, createLazyFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/rosters/')({
  component: Rosters
})

function Rosters(){
  const context = useLoaderData({from:"/rosters/"});
  console.log(context);
  return(
    <div>
      <ul>
        {context.result.map((i) => (
          <li key={i.rosterId}>
            <Link to="/rosters/$id" params={{id: i.rosterId}}>
              {i.startingWeek}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}