import { createFileRoute} from '@tanstack/react-router'
import { AppSettings } from '@/utils/configs'

// public ICollection<TResult> Result { get; set; }

// public int RosterId { get; set; }
// public int LocationId { get; set; }
// public DateTime StartingWeek { get; set; }


type RosterResponse = {
  rosterId: number
  locationId: number
  startingWeek: string
}

type RosterSearchResponse = {
  result: Array<RosterResponse>
  totalRecords: number
  pageSize: number
  pageNumber: number
}


export const Route = createFileRoute('/_auth/rosters/')({
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
  return await response.json() as RosterSearchResponse;

}