import db from '../mongodb'
const tagSchema = db.Schema({
  name: String,
  createTime: { type: Date, default: Date.now }
})
export default db.model('tag', tagSchema)
