const { createSlice,createAsyncThunk } = require("@reduxjs/toolkit");
import diseseaApi from '../../api/diseseaApi'
export const getCountBenh = createAsyncThunk('disesea/getCountBenh',async(params,thunkAPI)=>{
    const currentCountBenh = await diseseaApi.thongkeLoaiBenh()
    return currentCountBenh;
}
)
const checkArray = (list, object)=>{
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].ten_trieuchung === object.ten_trieuchung && list[i].vitri === object.vitri) {
            return {result: true , vitri:i};
        }
    }
    return {result: false};
}
const checkArrayImage = (list, object)=>{
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i].ten_trieuchung === object.ten_trieuchung && list[i].vitri === object.vitri && list[i].hinhanh === object.hinhanh) {
            return {result: true , vitri:i};
        }
    }
    return {result: false};
}
const diseseaSlice = createSlice({
    name: 'disesea',
    initialState: {
        benh: [],
        sobenh: {},
        chuandoan: [],
        trieuchungbandau: {}
    },
    reducers:{
        countDisesea:(state,action)=>{
            state.sobenh = action.payload
        },
        addDisesea:(state,action)=>{
            if(!checkArray(state.chuandoan,action.payload).result){
                state.chuandoan.push(action.payload)
            }
            
        },
        addDiseseaImage:(state,action)=>{
            if(!checkArray(state.chuandoan,action.payload).result){
                state.chuandoan.push(action.payload)
            }else{
                let newArr = state.chuandoan
                let vt = checkArray(state.chuandoan,action.payload).vitri
                newArr[vt].hinhanh = action.payload.hinhanh
                state.chuandoan = newArr 
            }
            
        },
        removeDisesea:(state,action)=>{
            if(checkArray(state.chuandoan,action.payload).result){
                let newArr = state.chuandoan
                let vitri = checkArray(state.chuandoan,action.payload).vitri
                newArr.splice(vitri,1)
                state.chuandoan = newArr
            }
        },
        addFirstTrieuChung:(state,action)=>{
            if(state.trieuchungbandau !== undefined){
                state.trieuchungbandau = action.payload,
                state.chuandoan = []
            }else{
                state.trieuchungbandau = action.payload
            }
            
        }
    },
    extraReducers:{
        [getCountBenh.fulfilled]:(state,action)=>{
            state.sobenh = action.payload
        }
    }
})
const { actions, reducer} = diseseaSlice;
export const {countDisesea ,addDisesea,addFirstTrieuChung,removeDisesea , addDiseseaImage} = actions;
export default reducer;