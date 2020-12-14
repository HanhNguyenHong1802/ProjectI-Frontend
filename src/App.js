import React,{Component} from 'react';
import './App.css';
import Main from './components/Main'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/ConfigureStore';
import "../node_modules/video-react/dist/video-react.css";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
    );
  } 
}

export default App;
