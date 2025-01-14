import React, { useState } from 'react'
import { MDBIcon,MDBBtn,MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../UI/Header/Header"
import Header from '../UI/Header/Header'
import TreeView from '../UI/TreeView/TreeView'
import TimeLine from '../UI/Timeline/Timeline'
import TextField from '@material-ui/core/TextField';
import Search from '../UI/Search/Search'
import Icon from '../UI/UndrawDesigner/IconSVG'
import ThongBao from '../UI/UndrawDesigner/BgSVG'
import {Helmet} from "react-helmet";

const Dianose = () =>{
  let history = useHistory();
  const [textSearch, setTextSearch] = useState()
  const [benh,setBenh] = useState()
  const [check, setCheck] = useState(false)
  const showBenh = (value)=>{
    if(!Number.isInteger(value)){
      setCheck(true)
      setBenh(value)
    }
    
  }
  const checkSearch = ()=>{
    (textSearch) ?  history.push("/chuandoan/"+textSearch) : alert(12)
  }
    return(
      <>
        <Helmet>
            <title>Dr.Rice - Chuẩn đoán </title>
        </Helmet>
        <Header url={false}/>
        <main className="grey lighten-4 pb-3">
        <MDBContainer fluid style={{paddingTop:"100px"}}>
          <MDBContainer className="bg-white shadow-box-example z-depth-1">
            <MDBRow>
              <MDBCol className="text-center">
                <p className="title-3 mb-0 pb-0 mt-3">Chuẩn đoán bệnh</p>
                <span className="line-3 mt-0 pt-0"></span>
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center mb-4">
                <Search/>
            </MDBRow>
            <MDBRow >
              <MDBCol sm="3" size="12" className=" pr-0 pl-0" >
                <MDBCol md="12" className=" pr-0 pl-0">
                <header className=" align-self-md-center" style={{height:"40px" , backgroundColor:"#2067dd "}}>
                  <p className="title-2">Các bệnh trên lúa</p>
                </header>
                </MDBCol>
                <MDBCol md="12" className=" pr-0 pl-0 ">
                  <TreeView show={showBenh}/>
                </MDBCol>
              </MDBCol>
              <MDBCol sm="9" size="12" className=" pr-0 pl-0">
                <MDBCol md="12" className=" pr-0 pl-0">
                  <header className=" align-self-md-center" style={{height:"40px" , backgroundColor:"#9e9e9e "}}>
                      <p className="title-2">Triệu chứng trên Lúa</p>
                  </header>
                </MDBCol>
                <MDBCol md="12" className=" pr-0 pl-0 d-flex justify-content-center align-items-center">
                  {check ? <TimeLine uri_benh={benh}/>:<ThongBao title="Chưa có thông tin về bệnh" subTitle="Vui lòng chọn bệnh phía bên phải"/> }
                </MDBCol>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
        </main>
      </>
    )
}
export default Dianose;