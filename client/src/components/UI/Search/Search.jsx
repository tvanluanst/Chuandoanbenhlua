/* eslint-disable no-use-before-define */
import React, {useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { MDBBtn,MDBContainer, MDBCol } from 'mdbreact';
import Icon from '../UndrawDesigner/IconSVG'
import { useHistory ,useLocation } from 'react-router-dom';
import diseseaApi from '../../../api/diseseaApi'
const Search = ()=> {
    const [textSearch, setTextSearch] = useState()
    const [data,setData] = useState([])
    let location = useLocation();
    let history = useHistory();
    const checkSearch = ()=>{
        (textSearch)
            ? history.push("/chuandoan/"+textSearch.trieuchung+"/"+textSearch.vitri)
            : alert(12)
    }
    useEffect(() => {
        const fetchAllTrieuChung = async() =>{
            const respose = await diseseaApi.getAllTrieuChung()
            setData(respose)
        }
        fetchAllTrieuChung()
    }, [])
    if(data.length > 0){
        return (
        <>
            <MDBCol md="9" sm="12" size="12" >
                <Autocomplete
                id="highlights-demo"
                options={data}
                getOptionLabel={(option) => option.ten_trieuchung}
                onChange={(e,value)=>{setTextSearch(value)}}
                renderInput={(params) => (
                    <TextField {...params} label="Nhập triệu chứng trên lúa ?" variant="outlined" margin="normal" />
                )}
                renderOption={(option, { inputValue }) => {
                    const matches = match(option.ten_trieuchung, inputValue);
                    const parts = parse(option.ten_trieuchung, matches);

                    return (
                    <div>
                        {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                            {part.text}
                        </span>
                        ))}
                    </div>
                    );
                }}
                />
            </MDBCol>
            <MDBCol  md ="2" sm="12" size="12" className="d-flex align-items-center pr-0 mt-1 justify-content-start justify-content-center"> 
                <MDBBtn tag="a" size="md" floating="true" className="teal lighten-3 z-depth-0 d-flex justify-content-center" onClick={checkSearch} >
                    <Icon.SearchIcon/>
                </MDBBtn>
            </MDBCol>
        </>
    );
    }else{
        return(
            <></>
        )
    }
    
}
const top100Films = [
  { title: 'Dangal', year: 2016 , uri:'Biến_màu_vàng_nâu_và_thối' },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
export default React.memo(Search)