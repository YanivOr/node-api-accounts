import mongoose, { Schema } from 'mongoose'
import Bcrypt from 'bcryptjs'

const accountsSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  roles: {
    type: Object
  },
  enabledActions: {
    type: Object
  },
  disabledActions: {
    type: Object
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

accountsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      username: this.username,
      phone: this.phone,
      email: this.email,
      roles: this.roles,
      enabledActions: this.enabledActions,
      disabledActions: this.disabledActions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

accountsSchema.pre('save', function (next) {
  this.password = Bcrypt.hashSync(this.password, 10)
  next()
})

const model = mongoose.model('Accounts', accountsSchema)

export const schema = model.schema
export default model
