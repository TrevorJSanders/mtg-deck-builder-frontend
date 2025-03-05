import { apiMongoDBClient } from "./apiClient";

export const getAllCardsMTG = async () => {
    try{
        const response = await apiMongoDBClient.get('/allCards/');
        return response.data;
    } catch(error) {
        throw new Error('Failed to fetch cards: ' + (error as Error).message);
    }
}

export const getImgMTG = async (cardID: string) => {
    try{
        const response = await apiMongoDBClient.get('/card/' + cardID);
        return response.data;
    } catch(error) {
        throw new Error('Failed to fetch cards: ' + (error as Error).message);
    }
}