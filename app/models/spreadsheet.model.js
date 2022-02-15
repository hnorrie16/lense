module.exports = mongoose => {
    var spreadhsheetSchema = mongoose.Schema(
        {
            spreadsheet: {
                processed_rows: {type: Object},
                row_number: {type: Number}
            }
        },
        { timestamps: true }
    );

    //converts _id object to id
    spreadhsheetSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Spreadsheet = mongoose.model("spreadsheet", spreadhsheetSchema);
    return Spreadsheet;
};
