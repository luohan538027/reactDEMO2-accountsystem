import axios from 'axios';

const api = process.env.REACT_APP_ACCOUNT_API || 'http://localhost:5000'


 export const getAll = () => axios.get(`${api}accounts`)

 export const create = (body) => axios.post(`${api}accounts`,body)

 export const update = (id,body) => axios.put(`${api}accounts/${id}`,body)

 export const remove = (id) => axios.delete(`${api}accounts/${id}`)
 