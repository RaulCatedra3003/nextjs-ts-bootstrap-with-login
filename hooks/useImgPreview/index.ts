import { useState } from 'react'

const useImgPreview = (refId: any) => {
  const [stateImg, setStateImg] = useState({
    urlPreview: '',
    file: null,
  })
  const { urlPreview } = stateImg

  const handleImage = () => {
    if (urlPreview) {
      document.querySelector(`#${refId}`).value = ''
      setStateImg({ file: null, urlPreview: '' })
    } else {
      document.querySelector(`#${refId}`).click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currentFile: any =  e.target.files && e.target.files[0];

    if (currentFile) {
      const reader = new FileReader()

      reader.addEventListener('load', function readerFiles() {
        const result = reader?.result?.toString() || ''
        setStateImg({ file: currentFile, urlPreview: result })
      })
      reader.readAsDataURL(currentFile)
    } else {
      setStateImg({ file: null, urlPreview: '' })
    }
  }

  return { stateImg, handleImageChange, handleImage, refId }
}

export default useImgPreview