import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

var objetos = [
  {
    "nombre": "Basic concepts",
    "hijos": [
      {
        "nombre": "Introduction to Economics",
        "link": "https://example.com/basic-concepts/economics"
      },
      {
        "nombre": "Principles of Accounting",
        "link": "https://example.com/basic-concepts/accounting"
      }
    ]
  },
  {
    "nombre": "Investment analysis",
    "hijos": [
      {
        "nombre": "Market Trends",
        "link": "https://example.com/investment-analysis/market-trends"
      },
      {
        "nombre": "Risk Assessment",
        "link": "https://example.com/investment-analysis/risk-assessment"
      }
    ]
  },
  {
    "nombre": "Fixed-income instruments",
    "hijos": [
      {
        "nombre": "Bonds Fundamentals",
        "link": "https://example.com/fixed-income/bonds-fundamentals"
      },
      {
        "nombre": "Bond Market Strategies",
        "link": "https://example.com/fixed-income/bond-market-strategies"
      }
    ]
  },
  {
    "nombre": "Variable-income instruments",
    "hijos": [
      {
        "nombre": "Stocks and Shares",
        "link": "https://example.com/variable-income/stocks-and-shares"
      },
      {
        "nombre": "Dividends Analysis",
        "link": "https://example.com/variable-income/dividends-analysis"
      }
    ]
  }
]

//root.render(<Acordeon informacion ={ objetos } ></Acordeon>);
root.render(<App />);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
