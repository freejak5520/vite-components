import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type Option = {
  value: string,
  label: string,
}

export function CommonOption({ value, label, onSelect, disabled }: {
  value: string,
  label: string,
  onSelect?: (value: string) => void,
  selected?: boolean
  disabled?: boolean
}) {
  return <div className={cn("cursor-pointer whitespace-nowrap", {
    "text-gray-500": disabled,
  })} onClick={() => {
    if (disabled) return;

    onSelect && onSelect(value);
  }}>{label}</div>;
}

export default function Select({
  name,
  id,
  onClick,
  onChange,
  onOpen,
  onClose,
  defaultValue,
  optionList,
  className,
  disabled,
}: {
  name?: string,
  id?: string,
  onClick?: (value: string) => void,
  onChange?: (value: string) => void,
  onOpen?: () => void,
  onClose?: () => void,
  defaultValue?: string,
  optionList: Option[],
  className?: string,
  disabled?: boolean,
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, _setIsOpen] = useState(false);

  const setIsOpen = useCallback((value: SetStateAction<boolean>) => {
    _setIsOpen(value);
  }, [])

  const [value, setValue] = useState(defaultValue || "")

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  useEffect(() => {

    // 드랍다운이 열릴 때, 드랍다운이 화면 밖으로 나가지 않도록 위치 조정
    if (isOpen) {
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const rect = dropdown.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          dropdown.style.transform = `translateX(${window.innerWidth - rect.right - 8
            }px)`;
        }
      }
    }

    if (isOpen) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return <div className="relative">
    <input type="hidden" name={name} id={id} value={value} />
    <div className={cn("flex justify-between items-center bg-white py-2 pl-4 pr-2 border rounded cursor-pointer w-fit ", className, {
      "bg-gray-500 cursor-default": disabled,
    })} onClick={() => {
      if (disabled) return;

      setIsOpen((prev) => !prev);
      onClick && onClick(value);
    }}>
      {optionList.find((option) => {
        return (option.value === value);
      })?.label || "Select"}

      <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4" />
      </svg>

    </div>
    {isOpen && <div ref={dropdownRef} className="z-10 bg-white min-w-32 absolute p-3 border rounded mt-1 flex flex-col gap-2">{
      optionList.map((option, index) => {
        return <CommonOption label={option.label} value={option.value} key={`${option.value}_${index}`} onSelect={() => {
          setValue(option.value);
          setIsOpen(false);
        }} selected={value === option.value} />
      })
    }</div>}
  </div>;
}
