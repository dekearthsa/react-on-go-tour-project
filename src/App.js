import './App.css';
import { useState, useEffect } from "react";
import axios from "axios"

function App() {

  const [imgFile, setImgFile] = useState("");
  const [isText, setIsText] = useState("");
  const [isSelectImgID, setIsSelectImgID] = useState("");
  const [isArrayImg, setIsArrayImg] = useState([]);

  const haddleFetchDebug = async () => {
    const text = await axios.get("https://demo-service-go-product-tour-zt27agut7a-as.a.run.app/api/debug")
    setIsText(text.data.status)
    console.log("text.data => ",text.data.status)
  }

 
  const  haddleFetchImage = async () => {
    const payload = {
      UserID: "Earth",
      ImageName:  "1_E_2022-10-28T14:45:42.954263+07:00.png"
    }
    try{
      const bytesImg = await axios.post("https://demo-service-go-product-tour-zt27agut7a-as.a.run.app/api/send/img",payload)
      // console.log(bytesImg.data.img)
      setImgFile(bytesImg.data.img)
    }catch(err){
      console.log("err ==> ",err)
    }
  }

  const haddleSelectImgByID = async () => {
    // console.log("selection id = ", isSelectImgID)
      for(let i = 0; i <  isArrayImg.length; i++){
        // console.log(isArrayImg[i], isSelectImgID)
        if(isArrayImg[i].TestID === isSelectImgID){
          const payload = {
              ID: isSelectImgID,
              ArrayImg : isArrayImg[i].ArrayImg
            }
          console.log(payload)
          const getMulitBase64 = await axios.post("https://demo-service-go-product-tour-zt27agut7a-as.a.run.app/api/send/mulit/img",payload)
          console.log(getMulitBase64.data);
          }
        }
        
      }
 

  const haddleFetchArrayImg = async () => {
    const arrayImgPath = await axios.get("https://demo-service-go-product-tour-zt27agut7a-as.a.run.app/api/send/selectpath");
    // console.log(arrayImgPath.data)
    setIsArrayImg(arrayImgPath.data.body)
  }

  const haddleImgId = (event) => {
    setIsSelectImgID(event.target.value)
  }

  useEffect(() => {
    haddleFetchArrayImg();
  }, []);

    return (
      <>
          <div className="App">
          <header className="App-header">
            <div>
              {
                imgFile !== "" && (
                  <img src={`data:image/png;base64,${imgFile}`} width="150" height="150"/>
                )
              }
            </div>
            <div>
              {
                isText !== "" && (
                  <div>{isText}</div>
                )
              }
              {
                isText === "" && (
                  <div>No text found</div>
                )
              }
              <div>
                <select 
                onChange={haddleImgId}
                defaultValue={isSelectImgID}
                >
                  <option value="None">None</option>
                {
                isArrayImg.map((item) => 
                    <option key={item.TestID} value={item.TestID}>
                      {item.TestID}
                    </option>
                  )
                }
               
                </select>
              </div>
              
            </div>
            <div>
              <button onClick={() => {haddleFetchDebug()}}>Fetch text</button>
              <button onClick={() => {haddleFetchImage()}}>Fetch image</button>
              <button onClick={() => {haddleSelectImgByID()}}>Find by ID</button>
            </div>
          </header>
        </div>
      </>
  
    );

              
}

export default App;
