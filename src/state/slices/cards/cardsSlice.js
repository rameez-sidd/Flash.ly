import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {

        addCard: (state, action) => {
            state.push(action.payload);
        },
        resetAllCards: () => initialState

    },
})

export const { addCard, resetAllCards } = cardsSlice.actions

export default cardsSlice.reducer