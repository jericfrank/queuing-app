import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { MAIN_MENU_ITEMS } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {MAIN_MENU_ITEMS.map(({ route, component }) => (
        <Route path={route} element={component} />
      ))}
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
