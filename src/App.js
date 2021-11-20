import './App.css';
import axios from 'axios'


function App() {
  const onClick = async () => {
    console.log('click')

    const data = {
      'email': "qwe199942@naver.com",
      'password': "qwe123"
    }

    //post 테스트
    // await axios.post('/session/login', data)
    // .then(function(response){
    //   console.log(response);
      
    // })
    // .catch(function(error){
    //   console.log(error);
    // });

    // get test
    await axios.get('/test')
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    });
  }
  return (
    <div className="App">
      <button onClick={onClick}>click</button>
    </div>
  );
}

export default App;
