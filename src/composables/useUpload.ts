interface OnUploadHandlers {
  onload(filename: string, data: string): void
  onerror?(err: DOMException): void
}

export default function ({onload, onerror}: OnUploadHandlers) {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.style.display = 'none'


  function onchange(event: Event): any {
    const input = event.target as HTMLInputElement
    if (!input.files) return cleanUp()
    const files = Array.from(input.files)

    function cleanUp() {
      document.body.removeChild(input)
    }

    Promise.all(
      files.map(file => new Promise<void>(resolve => {
        const fileName = file.name
  
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const data = reader.result
          onload(fileName, data as string)
          resolve()
        }
        reader.onerror = () => {
          onerror && onerror(reader.error as DOMException)
          return reader.error
        }
      }))
    ).finally(cleanUp)
  }
  input.addEventListener('change', onchange)

  document.body.appendChild(input)
  input.click()
}