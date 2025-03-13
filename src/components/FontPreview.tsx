import React from 'react'

type FontPreviewProps = {
  fontName: string
  fontFamily: string
  previewText: string
  fontSize: number
  isCustom: boolean
}

const FontPreview = ({ fontName, fontFamily, previewText, fontSize, isCustom }: FontPreviewProps) => {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 transition-all hover:shadow-md bg-white dark:bg-neutral-900">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-sm">{fontName}</h3>
        {isCustom && (
          <span className="text-xs px-2 py-1 bg-amaranth-100 text-amaranth-800 dark:bg-amaranth-900 dark:text-amaranth-100 rounded-full">
            Custom
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: `"${fontFamily}", sans-serif`,
          fontSize: `${fontSize}px`,
          lineHeight: 1.3,
        }}
        className="mt-2 break-words"
      >
        {previewText || "The quick brown fox jumps over the lazy dog"}
      </div>
    </div>
  )
}

export default FontPreview