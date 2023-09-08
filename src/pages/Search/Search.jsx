import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"

export default function Search() {
  const query = useQuery();
  const search = query.get('q')
  
    return (
    <div>
        <h2>search</h2>
        <p>{search}</p>
    </div>
  )
}
