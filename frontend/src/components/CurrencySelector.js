import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const CurrencySelector = ({ className = '' }) => {
  const { currency, changeCurrency, availableCurrencies } = useCurrency();

  const currencyLabels = {
    USD: '$ USD',
    LKR: 'Rs. LKR'
  };

  return (
    <Select value={currency} onValueChange={changeCurrency}>
      <SelectTrigger className={`w-24 h-8 text-xs ${className}`} data-testid="currency-selector">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableCurrencies.map((curr) => (
          <SelectItem key={curr} value={curr} className="text-xs">
            {currencyLabels[curr]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
