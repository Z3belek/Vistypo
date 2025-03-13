import { UploadCloud } from '@/icons/UploadCloud'
import { FontData } from '@/lib/types'
import { useCallback, useRef, useState } from 'react'

interface FileUploaderProps {
  onFontsLoaded: (fonts: FontData[]) => void
}

const FileUploader = ({ onFontsLoaded }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const loadFonts = useCallback(async (files: FileList) => {
    setError(null)
    const validExtensions = [".ttf", ".otf"]
    const fontPromises: Promise<FontData>[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()

      if (!validExtensions.includes(fileExtension)) {
        setError("Only .ttf and .otf files are supported")
        continue
      }

      fontPromises.push(loadFont(file))
    }

    try {
      const loadedFonts = await Promise.all(fontPromises)
      onFontsLoaded(loadedFonts)
    } catch (err) {
      setError("Failed to load one or more fonts")
      console.error(err)
    }
  }, [onFontsLoaded])

  const loadFont = (file: File): Promise<FontData> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (!e.target?.result) {
            reject(new Error("Failed to read file"))
            return
          }

          const fontName = file.name.replace(/\.[^/.]+$/, "") // Remove extension
          const fontFamily = `font-${Math.random().toString(36).substring(2, 9)}`
          const fontFace = new FontFace(fontFamily, e.target.result as ArrayBuffer)

          fontFace
            .load()
            .then(() => {
              // Add font to document
              document.fonts.add(fontFace)
              resolve({
                name: fontName,
                fontFamily,
                fontFace,
              })
            })
            .catch(reject)
        }

        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer.files) {
        loadFonts(e.dataTransfer.files)
      }
    },
    [loadFonts],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        loadFonts(e.target.files)
      }
    },
    [loadFonts],
  )

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${
          isDragging
            ? "border-amaranth-500 bg-amaranth-50 dark:bg-amaranth-950/30"
            : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600"
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileInput} accept=".ttf,.otf" className="hidden" multiple />

      <UploadCloud className="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-500"/>
      <h3 className="mt-2 text-sm font-medium">Drop your fonts here</h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Drag and drop font files (.ttf, .otf) or click to browse
      </p>

      {error && <div className="mt-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-2 rounded">{error}</div>}
    </div>
  )
}

export default FileUploader