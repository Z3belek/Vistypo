"use client"

import { Check } from "@/icons/Check"
import { ChevronDown } from "@/icons/ChevronDown"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

export type SelectOption = {
  value: string;
  label: string;
}

export interface SelectProps {
  options?: SelectOption[];
  min?: number;
  max?: number;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export const Select = ({
  options,
  min,
  max,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  error,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const selectRef = useRef<HTMLDivElement>(null);

  // Determinar las opciones finales
  const finalOptions = useMemo(() => {
    return options || (min !== undefined && max !== undefined
      ? Array.from({ length: max - min + 1 }, (_, i) => {
          const num = min + i;
          return { value: num.toString(), label: num.toString() };
        })
      : []);
  }, [options, min, max]);

  // Actualizar la etiqueta seleccionada basada en el valor
  useEffect(() => {
    const selected = finalOptions.find((option) => option.value === value);
    setSelectedLabel(selected?.label || "");
  }, [value, finalOptions]);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar navegación por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen((prev) => !prev);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        if (!isOpen) setIsOpen(true);
        break;
    }
  };

  const handleOptionSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  // Clases del contenedor principal
  const containerClasses = `relative w-full cursor-pointer px-3 py-2 transition-all duration-200 ease-in-out ${
    isOpen ? "bg-surface-a20/30 rounded-t-md" : "bg-surface-a10 rounded-md"
  } ${disabled ? "cursor-not-allowed opacity-50" : ""} ${error ? "border-destructive" : ""}`;

  // Clases del dropdown (estáticas)
  const dropdownClasses = "absolute left-0 z-10 mt-2 max-h-60 w-full overflow-auto rounded-b-md bg-surface-a10 bg-background py-1 shadow-lg animate-in fade-in-0 zoom-in-95 duration-100";

  // Clases dinámicas para las opciones
  const getOptionClass = (optionValue: string) =>
    `relative flex cursor-pointer select-none items-center px-3 py-2 transition-colors duration-150 ease-in-out group/select hover:bg-surface-a20 hover:text-black ${
      optionValue === value ? "bg-amaranth-600 text-white" : ""
    }`;

  return (
    <div className={`relative w-auto min-w-20 ${className}`}>
      <div
        ref={selectRef}
        className={containerClasses}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        role="combobox"
        aria-controls="select-listbox"
      >
        <div className="flex items-center justify-between" onClick={() => !disabled && setIsOpen(!isOpen)}>
          <span className={`block truncate ${!selectedLabel ? "text-black" : ""}`}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 fill-black dark:fill-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {isOpen && (
          <ul id="select-listbox" className={dropdownClasses} role="listbox">
            {finalOptions.map((option) => (
              <li
                key={option.value}
                className={getOptionClass(option.value)}
                onClick={() => handleOptionSelect(option)}
                role="option"
                aria-selected={option.value === value}
              >
                <span className="block truncate">{option.label}</span>
                {option.value === value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <Check className="h-4 w-4 fill-white group-hover/select:fill-black" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
};