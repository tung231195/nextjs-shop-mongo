export   const _fileToBase64= (file: File) =>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString().substr(reader.result.toString().indexOf(',') + 1));
      reader.onerror = error => reject(error);
    });
  }