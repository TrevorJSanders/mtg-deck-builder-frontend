
import { apiClient } from "./apiClient";

let isCardFetchInProgress = false;

export const getAllCardsMTG = async () => {
    if (isCardFetchInProgress) {
        console.log('Card fetch already in progress, waiting for existing request...');
        return new Promise((resolve) => {
            const checkCache = () => {
                if (!isCardFetchInProgress) {
                    resolve(getAllCardsMTG());
                } else {
                    setTimeout(checkCache, 100);
                }
            };
            setTimeout(checkCache, 100);
        });
    }
    
    isCardFetchInProgress = true;
    
    try {
        const response = await apiClient.get('/allCards/');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch cards: ' + (error as Error).message);
    } finally {
        isCardFetchInProgress = false;
    }
};

export const getImgMTG = async (cardID: string) => {
    try {
        const response = await apiClient.get('/card/' + cardID);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch cards: ' + (error as Error).message);
    }
};