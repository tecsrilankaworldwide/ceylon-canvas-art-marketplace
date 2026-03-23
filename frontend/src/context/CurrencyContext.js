import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrencyRates } from '../services/api';

const CurrencyContext = createContext(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');
  const [rates, setRates] = useState({ USD: 1, LKR: 325 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await getCurrencyRates();
        setRates(data.rates);
      } catch (error) {
        console.error('Failed to load currency rates:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRates();
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const formatPrice = (amount, showSymbol = true) => {
    if (amount === null || amount === undefined) return '-';
    
    // Convert from USD to selected currency
    const convertedAmount = amount * rates[currency];
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: showSymbol ? 'currency' : 'decimal',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: currency === 'LKR' ? 0 : 2
    });
    
    if (showSymbol && currency === 'LKR') {
      // Custom format for LKR
      return `Rs. ${Math.round(convertedAmount).toLocaleString()}`;
    }
    
    return formatter.format(convertedAmount);
  };

  const convertPrice = (amount) => {
    if (amount === null || amount === undefined) return 0;
    return amount * rates[currency];
  };

  const getSymbol = () => {
    return currency === 'LKR' ? 'Rs.' : '$';
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      rates,
      loading,
      changeCurrency,
      formatPrice,
      convertPrice,
      getSymbol,
      availableCurrencies: ['USD', 'LKR']
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
