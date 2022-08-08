import multer from 'multer'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/files/admin')
  },
  filename: (req, _file, cb) => {
    const filename = req.filename as string
    console.log('filename ', filename)
    cb(null, filename)
  }
}
)
const upload = multer({ storage })
export default upload.single('parametros')
