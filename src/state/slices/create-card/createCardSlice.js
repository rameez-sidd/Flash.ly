import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    group: {
        name: "",
        description: "",
        coverImg: ""
    },
    terms: [
        {
            name: "",
            definition: "",
            termImg: ""
        }
    ]
}

export const createCardSlice = createSlice({
    name: 'createCard',
    initialState,
    reducers: {

        addTerm: (state) => {
            state.terms.push({
                name: "",
                definition: "",
                termImg: ""
            });
        },
        removeTerm: (state, action) => {
            state.terms.splice(action.payload, 1)
        },
        setGroupDetails: (state, action) => {
            state.group = { ...state.group, ...action.payload };
        },
        setTerms: (state, action) => {
            state.terms = action.payload;
        },
        updateTermImage: (state, action) => {
            const { index, image } = action.payload;
            state.terms[index].termImg = image;
        },
        removeTermImage: (state, action) => {
            const index = action.payload;
            state.terms[index].termImg = "";
        },

        resetCard: () => initialState

    },
})

export const { addTerm, setGroupDetails, removeTerm, setTerms, resetCard, updateTermImage, removeTermImage } = createCardSlice.actions

export default createCardSlice.reducer