import axios from 'axios'
import { endpoints } from '@/constants/endpoints';

export default async function getMembersService() {
    try {
        const data = await axios.get(endpoints.get_members);        
        return data.data.members;
    } catch (error) {
        console.error("Error while getting books:",error)
    }
}