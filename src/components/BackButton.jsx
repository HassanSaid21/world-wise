import { useNavigate } from "react-router-dom"
import Button from "./Button"


function BackButton() {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={(e) => { 
          e.preventDefault()
          navigate('/app')
         }} type={"back"}>
        ⬅ Back
        </Button>
    </div>
  )
}

export default BackButton
