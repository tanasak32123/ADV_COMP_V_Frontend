import React from 'react'

type Props = {}

export default async function apiReward(){
    try {
        const response = await fetch("https://www.glo.or.th/api/lottery/getLatestLottery",{
            method: "POST"
        });
        return response.json()
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}