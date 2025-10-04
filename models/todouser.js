const {Schema,model }=require('mongoose');

const todoSchema = new Schema(
    {
        title: 
        { type: String, required: true },

        description: 
        { type: String, required: true },

        userId:
         { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }, { timestamps: true }
);

const todoModel = model('Todo', todoSchema);

module.exports = todoModel;