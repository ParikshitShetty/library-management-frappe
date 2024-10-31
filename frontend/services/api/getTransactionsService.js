import axios from 'axios'
import { endpoints } from '@/constants/endpoints';

export default async function getTransactionsService() {
    try {
        const data = await axios.get(endpoints.transactions.get_transactions);        
        return data.data.transactions;
    } catch (error) {
        console.error("Error while getting books:",error)
    }
}