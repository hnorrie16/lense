module.exports = mongoose => {
    var clientSchema = mongoose.Schema(
        {
            LensID: {
                type: String,
                maxlength: [200, "Maximum id number length of 200 characters"]
            },
            Category: {
                type: String,
                maxlength: [200, "Maximum name length of 200 characters"]
            },
            Sort: {
                type: Number
            },
            SupplierParent: {
                type: String
            },
            SupplierChild: {
                type: String
            },
            Abbreviation: {
                type: String,
                maxlength: [500, "Maximum length of 500 characters"]
            },
            Series_ID: {
                type: String,
                maxlength: [200, "Maximum length of 200 characters"]
            },
            LenseGroupID: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            LenseGroup: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            Rule1: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            Rule2: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            Rule3: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            RqsHC: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            Type: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            StartDate: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            EndDate: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            Active: {
                type: String
            },
            Code: {
                type: String,
                maxlength: [100, "Maximum length of 100 characters"]
            },
            Change: {
                type: String,
                maxlength: [200, "Maximum id number length of 200 characters"]
            },
            Description: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            Pack: {
                type: String
            },
            Stock: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            Index: {
                type: String
            },
            UV: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            AR: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            HC: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            PH: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            PO: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            TL: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            TD: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            MC: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            OAPrint: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            MedAidPrint: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            DiscPrint: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            Company: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            field39: {
                type: String,
                maxlengthf: [100, "Maximum id number length of 200 characters"]
            },
            field40: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            field41: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },
            field3: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            },       
            SAOAGroup: {
                type: String,
                maxlength: [100, "Maximum id number length of 200 characters"]
            }

        },
        { timestamps: true }
    );

    //converts _id object to id
    clientSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Client = mongoose.model("clients", clientSchema);
    return Client;
};
