/* eslint-disable react/prop-types */

import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { Outlet } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
function CityList({cities  , isLoading}) {
  if (isLoading) return <Spinner/>

  

  if (cities.length==0) return < Message message='Add your first message by clicking on the map' />
  return (<> 

    <ul className={styles.cityList}>
         {cities.map((city) => (
          <CityItem city={city} key={city.id} />
         ))}
    </ul>
</>
  )
}

export default CityList

