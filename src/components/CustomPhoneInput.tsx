import React, { FC } from "react";
import { CountrySelector, usePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}
const CustomPhoneInput: FC<CustomPhoneInputProps> = ({ value, onChange }) => {
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      initialCountry: "us",
      value,
      onCountryChange: onChange,
    });

  return (
    <div className="flex w-full rounded-lg border border-gray-300 bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
      <CountrySelector
        className="flex items-center"
        selectedCountry={country}
        onSelect={(country) => setCountry(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => (
          <button {...rootProps} className="w-12" type="button">
            {children}
          </button>
        )}
      />
      <input
        className="max-w-[calc(100%-60px)] p-2.5 text-sm outline-none"
        color="primary"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => {
          const value = handlePhoneValueChange(e);
          onChange(value);
        }}
        ref={inputRef}
      />
    </div>
  );
};
export default CustomPhoneInput;
