//------------ Register Handle ------------//
exports.apihandle = (req, res) => {
    var year = new Date().getFullYear();
    var d = new Date().getTime();

    var uuid = `xxxxxxxx-xxxx-${year}-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    res.send({ uuid: uuid });
}

const User = require('../models/User')

exports.playerhandle = async (req, res) => {
    try {
        // Count the number of unique email addresses
        const emails = await User.distinct('email');
        const playerCount = emails.length;
        res.json({ "playerCount": `${playerCount}` });
    } catch (error) {
        console.error('Error in playerHandle:', error);
        res.status(500).send('Server error');
    }
}

exports.playerTierHandler = async (req, res) => {
    try{
        const email = req.user.email;
        var associatedAccount = await User.findOne({email: email});

        if(!associatedAccount){
            return res.status(404).send("User not found!")
        }

        const tier = associatedAccount.tiers;

        res.json({tier: tier});
    } catch (error){
        console.error("Error in playerTierHandler: ", error);
        res.status(500).send("Service error");
    }
}

exports.interactionsHandler = async (req, res) => {
    try{
        const email = req.user.email;
        var associatedAccount = await User.findOne({email: email});
        if(!associatedAccount){
            return res.status(404).send("User not found!")
        }
        const totalInteractions = associatedAccount.totalInteractions;
        const dailyInteractions = associatedAccount.interactionsToday;
        const date = associatedAccount.firstInteraction;
        if (date.getUTCDate() === new Date().getUTCDate() && date.getUTCMonth() === new Date().getUTCMonth() && date.getUTCFullYear() === new Date().getUTCFullYear()) {

        }
        else{
            await User.updateOne(
                { _id: associatedAccount._id }, 
                { $set: { "interactionsToday": 0, "totalInteractions": totalInteractions } }
            );
        }
        res.json({totalInteractions: totalInteractions, dailyInteractions: dailyInteractions});

    } catch (error){
        console.error("Error in interactionsHandler: ", error);
        res.status(500).send("Service error");
    }
}

exports.updateInteractionsHandler = async (req, res) => {
    try{
        const email = req.user.email;
        var associatedAccount = await User.findOne({ email: email });
        if (!associatedAccount) {
            return res.status(404).send("User not found!");
        }

        let errors = []
        const totalInteractions = associatedAccount.totalInteractions;
        const updatedTotalInteractions = totalInteractions + 1;
        const dailyInteractions = associatedAccount.interactionsToday;
        const updatedDailyInteractions = dailyInteractions + 1;
        const monthlyInteractions = associatedAccount.monthlyInteractions;
        const updatedMonthlyInteractions = monthlyInteractions + 1;
        const date = associatedAccount.firstInteraction;
        const dailyLimit = associatedAccount.dailyLimit;
        const monthlyLimit = associatedAccount.monthlyLimit;
        const tier = associatedAccount.tiers;
        const canOverLimit = associatedAccount.overLimit;

        if(tier == "Free"){
            if(dailyInteractions >= dailyLimit){
                errors.push({msg:"Please upgrade to higher tier for more daily credits"})
            }
            else if(monthlyInteractions >= monthlyLimit){
                errors.push({msg:"Please upgrade to higher tier for more daily credits"})
            }
            else{
                if (date.getUTCDate() === new Date().getUTCDate() && date.getUTCMonth() === new Date().getUTCMonth() && date.getUTCFullYear() === new Date().getUTCFullYear()) {
                    await User.updateOne(
                        { _id: associatedAccount._id }, 
                        { $set: { "interactionsToday": updatedDailyInteractions, "totalInteractions": updatedTotalInteractions } }
                    );
                }
                else{
                    await User.updateOne(
                        { _id: associatedAccount._id }, 
                        { $set: { "interactionsToday": 1, "totalInteractions": updatedTotalInteractions } }
                    );
                }
            }
        }
        else{
            if(dailyInteractions >= dailyLimit){
                if(overLimit == true){
                    if (date.getUTCDate() === new Date().getUTCDate() && date.getUTCMonth() === new Date().getUTCMonth() && date.getUTCFullYear() === new Date().getUTCFullYear()) {
                        await User.updateOne(
                            { _id: associatedAccount._id }, 
                            { $set: { "interactionsToday": updatedDailyInteractions, "totalInteractions": updatedTotalInteractions } }
                        );
                    }
                    else{
                        await User.updateOne(
                            { _id: associatedAccount._id }, 
                            { $set: { "interactionsToday": 1, "totalInteractions": updatedTotalInteractions } }
                        );
                    }
                }
                else{
                    errors.push({msg:"Not authorized to go over the limit. If you would like to continue using our AI please enable going over the limit"})
                }
            }
            else if(monthlyInteractions >= monthlyLimit){
                if(overLimit == true){
                    if (date.getUTCDate() === new Date().getUTCDate() && date.getUTCMonth() === new Date().getUTCMonth() && date.getUTCFullYear() === new Date().getUTCFullYear()) {
                        await User.updateOne(
                            { _id: associatedAccount._id }, 
                            { $set: { "interactionsToday": updatedDailyInteractions, "totalInteractions": updatedTotalInteractions } }
                        );
                    }
                    else{
                        await User.updateOne(
                            { _id: associatedAccount._id }, 
                            { $set: { "interactionsToday": 1, "totalInteractions": updatedTotalInteractions } }
                        );
                    }
                }
                else{
                    errors.push({msg:"Not authorized to go over the limit. If you would like to continue using our AI please enable going over the limit"})
                }
            }
            else{
                if (date.getUTCDate() === new Date().getUTCDate() && date.getUTCMonth() === new Date().getUTCMonth() && date.getUTCFullYear() === new Date().getUTCFullYear()) {
                    await User.updateOne(
                        { _id: associatedAccount._id }, 
                        { $set: { "interactionsToday": updatedDailyInteractions, "totalInteractions": updatedTotalInteractions } }
                    );
                }
                else{
                    await User.updateOne(
                        { _id: associatedAccount._id }, 
                        { $set: { "interactionsToday": 1, "totalInteractions": updatedTotalInteractions } }
                    );
                }
            }
        }

        associatedAccount = await User.findOne({ email: email });
        res.json({totalInteractions: associatedAccount.totalInteractions, dailyInteractions: associatedAccount.dailyInteractions});

    } catch (error){
        console.error("Error in updateInteractionHandler: ", error);
        res.status(500).send("Service error");
    }
}


exports.updateSchema = async (req, res) => {
    const date = new Date();
    User.updateMany({}, 
        { $set: { tiers: 'Free' , firstInteraction: {date}, totalInteractions: 0, interactionsToday: 0, monthlyInteractions:0, dailyLimit: 100, monthlyLimit: 3000, overLimit: true}},
        { upsert: false, multi: true }
    ).then(result => {
        console.log('Documents updated:', result);
    }).catch(err => {
        console.error('Error updating documents:', err);
    });
}


