import { useEffect, useState } from "react"
import CustomPagination from "src/components/pagination"
import { CityDataType } from "src/configs/@type/city"
import { getAllCitys } from "src/service/city"

interface TPropsTest {
  cities:CityDataType[]
}
const TestPagge = (props:TPropsTest) => {
  const {cities} = props
  const [page, setPage] = useState(1);
  useEffect(() => {    
    setPage(1)
  },[page])

  return(<>
     {cities.length && cities.map((city) => {

        return (
          <> <h2>{city.name}</h2></>
        )
     })}
     <CustomPagination postsPerPage={3} totalPosts={cities.length} currentPage={1} setCurrentPage={1} />
  </>)
}

export default TestPagge

export async function getServerSideProps() {
  const allCity = await getAllCitys({limit:-1, page:-1});

  return {
    props: {
      'user_id':1222,
      cities: allCity?.data.cities,
    },
  }
}