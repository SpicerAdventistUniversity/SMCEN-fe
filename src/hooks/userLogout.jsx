import {useNavigate} from 'react-router-dom'

function userLogout() {
    let navigate = useNavigate()
  return ()=>{
    sessionStorage.clear()
    localStorage.clear()
    navigate('/login')
}
  
}

export default userLogout