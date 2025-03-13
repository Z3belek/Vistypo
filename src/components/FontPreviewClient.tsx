"use client";
import { FontData } from "@/lib/types";
import { getSystemFonts } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import FontPreview from "./FontPreview";
import { Select } from "./ui/Select";
import Button from "./ui/Button";

const FontPreviewClient = () => {
  const [previewText, setPreviewText] = useState(
    "The quick brown fox jumps over the lazy dog"
  );
  const [customFonts, setCustomFonts] = useState<FontData[]>([]);
  const [systemFonts, setSystemFonts] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(24);

  useEffect(() => {
    // Initialize with system fonts
    setSystemFonts(getSystemFonts());
  }, []);

  const handleFontUpload = (fonts: FontData[]) => {
    setCustomFonts([...customFonts, ...fonts]);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewText(e.target.value);
  };

  const clearAll = () => {
    setCustomFonts([]);
    setPreviewText("The quick brown fox jumps over the lazy dog");
  };

  return (
    <div className="space-y-8">
      <FileUploader onFontsLoaded={handleFontUpload} />

      <div className="flex w-full gap-5 items-center flex-col md:flex-row">
        <div className="space-y-2 w-full md:w-1/2">
          <label htmlFor="preview-text" className="sr-only">
            Preview Text
          </label>
          <input
            type="text"
            id="preview-text"
            className="bg-surface-a10 text-gray-900 text-sm rounded-full block w-full p-2.5 dark:placeholder-surface-a40 dark:text-white outline-0 focus:bg-surface-a10/70"
            placeholder="Type your text here..."
            value={previewText}
            onChange={handleTextChange}
          />
        </div>

        <div className="flex items-center gap-5 w-full md:w-1/2">
          <Select
            min={8}
            max={72}
            value={String(fontSize)}
            onChange={(val) => setFontSize(Number(val))}
          />
          <input
            type="range"
            min="8"
            max="72"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-surface-a20 dark:bg-surface-a20 rounded-lg appearance-none cursor-pointer accent-amaranth-600 focus:accent-amaranth-700"
          />
        </div>
      </div>
      <Button onClick={clearAll} className="cursor-pointer text-white bg-amaranth-600 hover:bg-amaranth-700 transition-transform duration-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 outline-none w-full">
        Clear All
      </Button>

      <div className="space-y-8">
        {customFonts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Uploaded Fonts</h2>
            <div className="space-y-4">
              {customFonts.map((font, index) => (
                <FontPreview
                  key={`${font.name}-${index}`}
                  fontName={font.name}
                  fontFamily={font.fontFamily}
                  previewText={previewText}
                  fontSize={fontSize}
                  isCustom={true}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">System Fonts</h2>
          <div className="space-y-4">
            {systemFonts.map((fontName, index) => (
              <FontPreview
                key={`system-${index}`}
                fontName={fontName}
                fontFamily={fontName}
                previewText={previewText}
                fontSize={fontSize}
                isCustom={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontPreviewClient;
