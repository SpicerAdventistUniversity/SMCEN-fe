import {useNavigate} from 'react-router-dom'

function useLogout() {
    let navigate = useNavigate()
  return ()=>{
    sessionStorage.clear()
    localStorage.clear()
    navigate('/adminlogin')
}
  
}

export default useLogout