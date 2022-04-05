import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import {fetchData, clearData, incrementData, decrementData, inputData} from "./features/dataSlice"
import {useEffect} from "react"

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  return (
    <div className="App">
      <h1>{data.objectId}</h1>
      <div>
        <button onClick={() => {dispatch(fetchData())}}>Trigger Thunk</button>
        <button onClick={() => {dispatch(clearData())}}>Clear</button>
        <button onClick={() => {dispatch(incrementData())}}>Next</button>
        <button onClick={() => {dispatch(decrementData())}}>Back</button>
      </div>
      <input value={data.objectId} onChange={(e) => {dispatch(inputData(Number(e.target.value)))}} />
      <div>
        {data.apiData.primaryImage ? <img style={{height: "50vh"}} src={data.apiData.primaryImage} alt="object"></img> : <h2>No Image</h2>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    objectId: state.data.objectId
  })

export default connect(mapStateToProps)(App);
