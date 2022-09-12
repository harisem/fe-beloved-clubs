import axios from 'axios'
import { useEffect, useState } from 'react'

const usePrivateRequest = ({ url, body = null }) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const fetchData = async (token) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8004/api/v1/${url}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setResponse(res.data.data)
            setLoading(false)
        } catch (err) {
            setError(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("persist:root"))?.user
        const currentUser = user && JSON.parse(user)
        const TOKEN = currentUser?.token
        fetchData(TOKEN)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, body])

    return { response, error, loading }
}

export default usePrivateRequest
