import { createFileRoute } from '@tanstack/react-router'
import { AppSettings } from '../utils/configs'

export const Route = createFileRoute('/rosters/')({
  loader: async () => {
    return await GetRoster()
  }
})

async function GetRoster() {
  const response = await fetch(`${AppSettings.baseUrl}/rosters/search`,{
    method:"POST",
    body:JSON.stringify({pageSize:100}),
    headers:{
      "Content-Type": "application/json"
    }
  })
  console.log(response);
  return await response.json();
}