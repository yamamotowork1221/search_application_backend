import express from 'express';
import type { Application, Request, Response } from 'express';
import axios from 'axios';

export const apiGetServices = async (endpoint: string): Promise<any> => {
    try {
        const url: string = endpoint;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('API呼び出し中にエラーが発生しました:', error);
        throw new Error('Something went wrong');
    };
};