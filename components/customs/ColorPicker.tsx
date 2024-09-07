import React, { useState } from "react";
import { ChromePicker } from "react-color";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (newColor: any) => {
    onChange(newColor.hex);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-start text-left font-normal"
          style={{ backgroundColor: color }}
        >
          <div
            className="w-4 h-4 rounded-full mr-2 border"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <ChromePicker color={color} onChange={handleColorChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
